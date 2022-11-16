---
createTime: 2022/11/14
tag: 'Vue源码'
---
# 插槽

## 插槽的实现

* 父组件渲染阶段 子组件插槽部分的 DOM 是不能渲染的
* 需要通过某种方式保留下来
* 等到子组件渲染的时候 再渲染

## 父组件的渲染

* 通常创建 vnode 传入的子节点是一个数组
* createVNode 函数的最后执行了 createBaseVNode 函数来创建 vnode 对象 并且最后一个 参数 needFullChildrenNormaliztion 的值为 true
* 在 createBaseVNode 内部会进行判断  如果 needFullChildrenNormaliztion 的值为 true 则执行 normalizeChildren 函数
* 标准化传入的参数 children

### normalizeChildren

* 主要的作用标准化 children 以及更新 vnode 的节点类型 shapeFlag
* 主要关注插槽的逻辑
  * children 是 object 类型 经过处理 vnode.children 是插槽对象
  * 而 vnode.shapeFlag 会与 slot 子节点类型 SLOTS_CHILDREN 进行 或运算
  * 由于当前的 vnode 本身的 shapeFlag 是 STATEFUL_COMPONENT
  * 所以运算后的 shapeFlag 是 SLOTS_CHILDREN |  STATEFUL_COMPONENT
* 确认了 shapeFlag 会影响后续的 patch 过程  
  * patch中 根据 vnode 的type 和 shapeFlag 决定后续执行的逻辑
  * 由于 type 是 组件对象 会运行 processComponent 递归渲染子组件
  * 通过递归方式 渲染  插槽对象还是保留在组件 vnode 的 children 属性中

```ts

export function normalizeChildren(vnode: VNode, children: unknown) {
  let type = 0
  const { shapeFlag } = vnode
  if (children == null) {
    children = null
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN
  } else if (typeof children === 'object') {
    if (shapeFlag & (ShapeFlags.ELEMENT | ShapeFlags.TELEPORT)) {
      // Normalize slot to plain children for plain element and Teleport
      const slot = (children as any).default
      if (slot) {
        // _c marker is added by withCtx() indicating this is a compiled slot
        slot._c && (slot._d = false)
        normalizeChildren(vnode, slot())
        slot._c && (slot._d = true)
      }
      return
    } else {
      type = ShapeFlags.SLOTS_CHILDREN
      const slotFlag = (children as RawSlots)._
      if (!slotFlag && !(InternalObjectKey in children!)) {
        // if slots are not normalized, attach context instance
        // (compiled / normalized slots already have context)
        ;(children as RawSlots)._ctx = currentRenderingInstance
      } else if (slotFlag === SlotFlags.FORWARDED && currentRenderingInstance) {
        // a child component receives forwarded slots from the parent.
        // its slot type is determined by its parent's slot type.
        if (
          (currentRenderingInstance.slots as RawSlots)._ === SlotFlags.STABLE
        ) {
          ;(children as RawSlots)._= SlotFlags.STABLE
        } else {
          ;(children as RawSlots)._ = SlotFlags.DYNAMIC
          vnode.patchFlag |= PatchFlags.DYNAMIC_SLOTS
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance }
    type = ShapeFlags.SLOTS_CHILDREN
  } else {
    children = String(children)
    // force teleport children to array so it can be moved around
    if (shapeFlag & ShapeFlags.TELEPORT) {
      type = ShapeFlags.ARRAY_CHILDREN
      children = [createTextVNode(children as string)]
    } else {
      type = ShapeFlags.TEXT_CHILDREN
    }
  }
  vnode.children = children as VNodeNormalizedChildren
  vnode.shapeFlag |= type
}

```

## 子组件的渲染

* 在组件的渲染过程中  有一个 setupComponent 的流程
* 在 setupComponent 的执行过程中  会通过 initSlots 函数去初始化插槽 并传入 instance 和 children
* 由于组件 vnode 的 shapeFlag 满足了 shapeFlag & 32  可以把操场对象保留到 instance.slots 对象中
* 后续的程序就可以从 instance.slots 拿到插槽对象了
* 子组件插槽部分的 DOM 通过 renderSlot 函数渲染生成的

```ts
export function setupComponent(
  instance: ComponentInternalInstance,
  isSSR = false
) {
  isInSSRComponentSetup = isSSR

  const { props, children } = instance.vnode
  const isStateful = isStatefulComponent(instance)
  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)

  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined
  isInSSRComponentSetup = false
  return setupResult
}
```

### renderSlot

* renderSlot 首先根据第二个参数 name 获取对应的插槽函数 slot
* 然后执行 slot 函数获取插槽的内容  
* 这里会执行  ensureVaildVNode 进行判断
* 如果插槽中全是注释节点 不是一个合法的插槽内容
* 最后通过  createBlock 创建了 Fragment 类型的 vnode 节点并返回  其中 children 是 validSlotContent

```ts

export function renderSlot(
  slots: Slots,
  name: string,
  props: Data = {},
  // this is not a user-facing function, so the fallback is always generated by
  // the compiler and guaranteed to be a function returning an array
  fallback?: () => VNodeArrayChildren,
  noSlotted?: boolean
): VNode {
  if (
    currentRenderingInstance!.isCE ||
    (currentRenderingInstance!.parent &&
      isAsyncWrapper(currentRenderingInstance!.parent) &&
      currentRenderingInstance!.parent.isCE)
  ) {
    return createVNode(
      'slot',
      name === 'default' ? null : { name },
      fallback && fallback()
    )
  }

  let slot = slots[name]

  if (__DEV__ && slot && slot.length > 1) {
    warn(
      `SSR-optimized slot function detected in a non-SSR-optimized render` +
        `function. You need to mark this component with $dynamic-slots in the` +
        `parent template.`
    )
    slot = () => []
  }

  // a compiled slot disables block tracking by default to avoid manual
  // invocation interfering with template-based block tracking, but in
  // `renderSlot` we can be sure that it's template-based so we can force
  // enable it.
  if (slot && (slot as ContextualRenderFn)._c) {
    ;(slot as ContextualRenderFn)._d = false
  }
  openBlock()
  const validSlotContent = slot && ensureValidVNode(slot(props))
  const rendered = createBlock(
    Fragment,
    {
      key:
        props.key ||
        // slot content array of a dynamic conditional slot may have a branch
        // key attached in the `createSlots` helper, respect that
        (validSlotContent && (validSlotContent as any).key) ||
        `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && (slots as RawSlots)._=== SlotFlags.STABLE
      ? PatchFlags.STABLE_FRAGMENT
      : PatchFlags.BAIL
  )
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + '-s']
  }
  if (slot && (slot as ContextualRenderFn)._c) {
    ;(slot as ContextualRenderFn)._d = true
  }
  return rendered
}
```

### slot 函数执行的逻辑

* 执行了_withCtx 函后的返回值
* _withCtx 的主要作用就是给待执行的函数 fn 坐了一层封装
  * 使 fn 执行当前组件实例指向上下文变量 ctx
  * ctx 默认值是 currentRenderinginstance   也就是执行 render 函数的组件实例
* 对于 withCtx 返回新的函数 renderFnWithContext 来说
  * 当它执行的时候 会先执行 setCurrentRenderinginstance
  * 把 ctx 设置成当前渲染组件实例  并返回值之前的渲染组件实例 prevInstance 然后执行 fn
  * 执行完毕之后 把之前的 prevInstance 设置成当前渲染组件
* 通过 withCtx 封装 保证了在组件中渲染具体插槽的内容
  * 渲染组件实例是父组件的实例
  * 保证了 数据作用域来源是父组件

```ts
/**

* Wrap a slot function to memoize current rendering instance
* @private compiler helper
 */
export function withCtx(
  fn: Function,
  ctx: ComponentInternalInstance | null = currentRenderingInstance,
  isNonScopedSlot?: boolean // __COMPAT__ only
) {
  if (!ctx) return fn

  // already normalized
  if ((fn as ContextualRenderFn)._n) {
    return fn
  }

  const renderFnWithContext: ContextualRenderFn = (...args: any[]) => {
    // If a user calls a compiled slot inside a template expression (#1745), it
    // can mess up block tracking, so by default we disable block tracking and
    // force bail out when invoking a compiled slot (indicated by the ._d flag).
    // This isn't necessary if rendering a compiled `<slot>`, so we flip the
    // ._d flag off when invoking the wrapped fn inside `renderSlot`.
    if (renderFnWithContext._d) {
      setBlockTracking(-1)
    }
    const prevInstance = setCurrentRenderingInstance(ctx)
    const res = fn(...args)
    setCurrentRenderingInstance(prevInstance)
    if (renderFnWithContext._d) {
      setBlockTracking(1)
    }

    if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
      devtoolsComponentUpdated(ctx)
    }

    return res
  }

  // mark normalized to avoid duplicated wrapping
  renderFnWithContext._n = true
  // mark this as compiled by default
  // this is used in vnode.ts -> normalizeChildren() to set the slot
  // rendering flag.
  renderFnWithContext._c = true
  // disable block tracking by default
  renderFnWithContext._d = true
  // compat build only flag to distinguish scoped slots from non-scoped ones
  if (__COMPAT__ && isNonScopedSlot) {
    renderFnWithContext._ns = true
  }
  return renderFnWithContext
}
```

### 作用域插槽

* 和普通插槽相比 作用域插槽编译生成的 render 函数中的插槽对象稍有不同
  * 使用 withCtx 封装的插槽函数多了一个参数 slotProps
  * 这样函数可以在内容获取数据
* 作用域插槽和普通插槽一样 也是通过 renderSlot 函数 渲染插槽节点内容
* 不同的是
  * renderSlot 多了第三个参数 就是子组件提供的数据
  * 第三个参数 props 就是 提到的 slotProps
  * 在执行 slot 插槽函数的时候 作为参数传入
  * 通过这种方式 就可以把子组件的数据传递到父组件定义的插槽函数了

## 总结

* 插槽的实现实际就是一种延时渲染 把父组件中编写的插槽内容保存到一个对象上
  * 并且把具体的渲染 dom 的代码用函数的方式 封装一下
  * 在子组件渲染的时候 根据插槽的名称在对象中找到对应的函数
  * 执行这些函数生成 vnode
* 普通插槽渲染时的数据作用域和父组件相同
  * 如果想要在插槽渲染时使用子组件的渲染函数
  * 可以通过作用于插槽
  * 让子组件渲染的时候 通过函数参数方式传递子组件的数据