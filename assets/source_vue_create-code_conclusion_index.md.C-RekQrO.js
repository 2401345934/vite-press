import{_ as o,o as c,c as n,J as e,w as r,m as l,a as s,aa as d,E as t}from"./chunks/framework.DJCjJe2w.js";const g=JSON.parse('{"title":"总结","description":"","frontmatter":{"createTime":"2022/11/12","tag":"Vue源码"},"headers":[],"relativePath":"source/vue/create-code/conclusion/index.md","filePath":"source/vue/create-code/conclusion/index.md","lastUpdated":1668255511000}'),_={name:"source/vue/create-code/conclusion/index.md"},u=l("h1",{id:"总结",tabindex:"-1"},[s("总结 "),l("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),p=d("<ul><li>生成代码阶段也是一个 自顶向下的过程 主要依据在前面转换了 AST 对象去生成相应的代码</li><li>在生成过程中 首先创建了 codegen 上下文 负责维护整个代码生成阶段中的一些状态数据 <ul><li>当前代码</li><li>缩进</li><li>以及提供一下修改上下文数据的辅助函数</li></ul></li><li>接着生成一些预设代码 <ul><li>比如引入辅助函数</li><li>生成静态提升相关代码</li></ul></li><li>最后生成与渲染函数相关的代码 <ul><li>比如生成渲染函数的名称和参数</li><li>生成资源声明的代码</li><li>生成创建 vnode 树的代码</li></ul></li><li>在创建 vnode 树的过程中 会先执行 genNode 针对不同节点执行了 不同的代码生成逻辑 过程可能存在递归执行 genNode 的情况 完成整个 vnode 树的构建</li><li>在整个编译阶段 会给动态节点打上相应的 patchFlag</li><li>这样在运行阶段就可收集到所有动态节点 形成一个 block tree</li><li>在patch 阶段更新组件的时候 可以遍历 block tree 只对比动态节点 达到性能优化</li></ul>",1);function m(h,f,x,v,T,N){const i=t("ArticleMetadata"),a=t("ClientOnly");return c(),n("div",null,[u,e(a,null,{default:r(()=>[e(i)]),_:1}),p])}const A=o(_,[["render",m]]);export{g as __pageData,A as default};