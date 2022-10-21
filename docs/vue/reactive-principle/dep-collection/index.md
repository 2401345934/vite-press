# 依赖收集

* 依赖收集发生在数据的访问阶段 当数据被访问 会执行 get 函数
* get 函数 是执行 createGetter 函数的返回值  isReadonly 默认 false

## get

* get 函数主要做了 4件事
* 对特殊的 key 做了 代理  比如： __v_raw 返回原始对象 target
* 如果 target 是数组 并且命中了 arrayInstrumentations 执行内部对应函数
* 通过 Reflect.get 函数求值 并执行  track 函数收集依赖
* 对象属性访问的时候才会判断子属性的类型 决定是否要递归执行 reactive

## arrayInstrumentations

* 重写了数组中的 includes indexOf lastIndexOf 函数
* 当对响应式对象调用 这三个函数 就会 对数组的每一个 元素都进行代理 做依赖收集

## track

* 创建了全局的 targetMap作为原始数据对象的 Map
* 键是 target 值是 depsMap 用来作为依赖的 Map
* depsMap 键是 target 的key 值是 dep 集合
* dep 集合 中存储的是依赖的副作用函数
* 每次执行  track 函数 就会把当前激活副作用函数 activeEffect 作为依赖
* 收集到 与target 相关的 depsMap 对应 key 下的依赖集合 dep 中