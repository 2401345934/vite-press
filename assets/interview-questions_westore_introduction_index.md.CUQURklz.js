import{_ as t,o as c,c as o,J as s,w as p,m as l,a as i,aa as e,E as r}from"./chunks/framework.DJCjJe2w.js";const N=JSON.parse('{"title":"小程序攻略","description":"","frontmatter":{"createTime":"2023/04/17","tag":"westore"},"headers":[],"relativePath":"interview-questions/westore/introduction/index.md","filePath":"interview-questions/westore/introduction/index.md","lastUpdated":1681712169000}'),b={name:"interview-questions/westore/introduction/index.md"},u=l("h1",{id:"小程序攻略",tabindex:"-1"},[i("小程序攻略 "),l("a",{class:"header-anchor",href:"#小程序攻略","aria-label":'Permalink to "小程序攻略"'},"​")],-1),m=l("blockquote",null,[l("p",null,[i("该内容由银科控股融汇研发部曹俊及其团队授权提供。该团队拥有 10 多名小程序开发，深耕小程序领域，总结出了本篇优质长文。同时本篇内容也已经合并入我的 "),l("a",{href:"https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FInterviewMap%2FCS-Interview-Knowledge-Map",title:"https://github.com/InterviewMap/CS-Interview-Knowledge-Map",target:"_blank",rel:"noreferrer"},"开源项目"),i(" 中，目前项目内容包含了 JS、网络、浏览器相关、性能优化、安全、框架、Git、数据结构、算法等内容，无论是基础还是进阶，亦或是源码解读，你都能在本图谱中得到满意的答案，希望这个面试图谱能够帮助到大家更好的准备面试。")])],-1),d=l("h1",{id:"小程序-登录",tabindex:"-1"},[i("小程序-登录 "),l("a",{class:"header-anchor",href:"#小程序-登录","aria-label":'Permalink to "小程序-登录"'},"​")],-1),h=e('<h2 id="unionid和openid" tabindex="-1">unionid和openid <a class="header-anchor" href="#unionid和openid" aria-label="Permalink to &quot;unionid和openid&quot;">​</a></h2><p>了解小程序登陆之前，我们写了解下小程序/公众号登录涉及到两个最关键的用户标识：</p><ul><li><code>OpenId</code> 是一个用户对于一个小程序／公众号的标识，开发者可以通过这个标识识别出用户。</li><li><code>UnionId</code> 是一个用户对于同主体微信小程序／公众号／APP的标识，开发者需要在微信开放平台下绑定相同账号的主体。开发者可通过UnionId，实现多个小程序、公众号、甚至APP 之间的数据互通了。</li></ul><h2 id="关键api" tabindex="-1">关键Api <a class="header-anchor" href="#关键api" aria-label="Permalink to &quot;关键Api&quot;">​</a></h2><ul><li><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fapi-login.html" title="https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html" target="_blank" rel="noreferrer"><code>wx.login</code></a> 官方提供的登录能力</p></li><li><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fsignature.html%23wxchecksessionobject" title="https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#wxchecksessionobject" target="_blank" rel="noreferrer"><code>wx.checkSession</code></a> 校验用户当前的session_key是否有效</p></li><li><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fauthorize.html" title="https://developers.weixin.qq.com/miniprogram/dev/api/authorize.html" target="_blank" rel="noreferrer"><code>wx.authorize</code></a> 提前向用户发起授权请求</p></li><li><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fapi-login.html" title="https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html" target="_blank" rel="noreferrer"><code>wx.getUserInfo</code></a> 获取用户基本信息</p></li></ul><h2 id="登录流程设计" tabindex="-1">登录流程设计 <a class="header-anchor" href="#登录流程设计" aria-label="Permalink to &quot;登录流程设计&quot;">​</a></h2><p>以下从笔者接触过的几种登录流程来做阐述:</p><h3 id="利用现有登录体系" tabindex="-1">利用现有登录体系 <a class="header-anchor" href="#利用现有登录体系" aria-label="Permalink to &quot;利用现有登录体系&quot;">​</a></h3><p>直接复用现有系统的登录体系，只需要在小程序端设计用户名，密码/验证码输入页面，便可以简便的实现登录，只需要保持良好的用户体验即可。</p><h3 id="利用openid-创建用户体系" tabindex="-1">利用OpenId 创建用户体系 <a class="header-anchor" href="#利用openid-创建用户体系" aria-label="Permalink to &quot;利用OpenId 创建用户体系&quot;">​</a></h3><p>👆提过，<code>OpenId</code> 是一个小程序对于一个用户的标识，利用这一点我们可以轻松的实现一套基于小程序的用户体系，值得一提的是这种用户体系对用户的打扰最低，可以实现静默登录。具体步骤如下：</p><ol><li><p>小程序客户端通过 <code>wx.login</code> 获取 code</p></li><li><p>传递 code 向服务端，服务端拿到 code 调用微信登录凭证校验接口，微信服务器返回 <code>openid</code> 和会话密钥 <code>session_key</code> ，此时开发者服务端便可以利用 <code>openid</code> 生成用户入库，再向小程序客户端返回自定义登录态</p></li><li><p>小程序客户端缓存 （通过<code>storage</code>）自定义登录态（token），后续调用接口时携带该登录态作为用户身份标识即可</p></li></ol><h3 id="利用-unionid-创建用户体系" tabindex="-1">利用 Unionid 创建用户体系 <a class="header-anchor" href="#利用-unionid-创建用户体系" aria-label="Permalink to &quot;利用 Unionid 创建用户体系&quot;">​</a></h3><p>如果想实现多个小程序，公众号，已有登录系统的数据互通，可以通过获取到用户 unionid 的方式建立用户体系。因为 unionid 在同一开放平台下的所所有应用都是相同的，通过 <code>unionid</code> 建立的用户体系即可实现全平台数据的互通，更方便的接入原有的功能，那如何获取 <code>unionid</code> 呢，有以下两种方式：</p><ol><li><p>如果户关注了某个相同主体公众号，或曾经在某个相同主体App、公众号上进行过微信登录授权，通过 <code>wx.login</code> 可以直接获取 到 <code>unionid</code></p></li><li><p>结合 <code>wx.getUserInfo</code> 和 <code>&lt;button open-type=&quot;getUserInfo&quot;&gt;&lt;button/&gt;</code> 这两种方式引导用户主动授权，主动授权后通过返回的信息和服务端交互 (这里有一步需要服务端解密数据的过程，很简单，微信提供了示例代码) 即可拿到 <code>unionid</code> 建立用户体系， 然后由服务端返回登录态，本地记录即可实现登录，附上微信提供的最佳实践：</p><ul><li><p>调用 wx.login 获取 code，然后从微信后端换取到 session_key，用于解密 getUserInfo返回的敏感数据。</p></li><li><p>使用 wx.getSetting 获取用户的授权情况</p><ul><li>如果用户已经授权，直接调用 API wx.getUserInfo 获取用户最新的信息；</li><li>用户未授权，在界面中显示一个按钮提示用户登入，当用户点击并授权后就获取到用户的最新信息。</li></ul></li><li><p>获取到用户数据后可以进行展示或者发送给自己的后端。</p></li></ul></li></ol><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><ol><li>需要获取 <code>unionid</code> 形式的登录体系，在以前（18年4月之前）是通过以下这种方式来实现，但后续微信做了调整（因为一进入小程序，主动弹起各种授权弹窗的这种形式，比较容易导致用户流失），调整为必须使用按钮引导用户主动授权的方式，这次调整对开发者影响较大，开发者需要注意遵守微信的规则，并及时和业务方沟通业务形式，不要存在侥幸心理，以防造成小程序不过审等情况。</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>   wx.login(获取code) ===&gt; wx.getUserInfo(用户授权) ===&gt; 获取 unionid</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2"><li><p>因为小程序不存在 <code>cookie</code> 的概念， 登录态必须缓存在本地，因此强烈建议为登录态设置过期时间</p></li><li><p>值得一提的是如果需要支持风控安全校验，多平台登录等功能，可能需要加入一些公共参数，例如platform，channel，deviceParam等参数。在和服务端确定方案时，作为前端同学应该及时提出这些合理的建议，设计合理的系统。</p></li><li><p><code>openid</code> ， <code>unionid</code> 不要在接口中明文传输，这是一种危险的行为，同时也很不专业。</p></li></ol><h1 id="小程序-图片导出" tabindex="-1">小程序-图片导出 <a class="header-anchor" href="#小程序-图片导出" aria-label="Permalink to &quot;小程序-图片导出&quot;">​</a></h1>',20),g=e(`<p>经常开发和使用小程序的同学对这个功能一定不陌生，这是一种常见的引流方式，一般同时会在图片中附加一个小程序二维码。</p><h2 id="基本原理" tabindex="-1">基本原理 <a class="header-anchor" href="#基本原理" aria-label="Permalink to &quot;基本原理&quot;">​</a></h2><ol><li><p>借助 <code>canvas</code> 元素，将需要导出的样式首先在 <code>canvas</code> 画布上绘制出来 （api基本和h5保持一致，但有轻微差异，使用时注意即可）</p></li><li><p>借助微信提供的 <code>canvasToTempFilePath</code> 导出图片，最后再使用 <code>saveImageToPhotosAlbum</code> （需要授权）保存图片到本地</p></li></ol><h2 id="如何优雅实现" tabindex="-1">如何优雅实现 <a class="header-anchor" href="#如何优雅实现" aria-label="Permalink to &quot;如何优雅实现&quot;">​</a></h2><p>根据上述的原理来看，实现是很简单的，只不过就是设计稿的提取，绘制即可，但是作为一个常用功能，每次都这样写一坨代码岂不是非常的难受。那小程序如何设计一个通用的方法来帮助我们导出图片呢？思路如下：</p><ol><li><p>绘制出需要的样式这一步是省略不掉的。但是我们可以封装一个绘制库，包含常见图形的绘制，例如矩形，圆角矩形，圆， 扇形， 三角形， 文字，图片减少绘制代码，只需要提炼出样式信息，便可以轻松的绘制，最后导出图片存入相册。笔者觉得以下这种方式绘制更为优雅清晰一些，其实也可以使用加入一个type参数来指定绘制类型，传入的一个是样式数组，实现绘制。</p></li><li><p>结合上一步的实现，如果对于同一类型的卡片有多次导出需求的场景，也可以使用自定义组件的方式，封装同一类型的卡片为一个通用组件，在需要导出图片功能的地方，引入该组件即可。</p></li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    </span></span>
<span class="line"><span>  class CanvasKit {</span></span>
<span class="line"><span>    constructor() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    drawImg(option = {}) {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      return this</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    drawRect(option = {}) {</span></span>
<span class="line"><span>      return this</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    drawText(option = {}) {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>      return this</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    static exportImg(option = {}) {</span></span>
<span class="line"><span>      ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let drawer = new CanvasKit(&#39;canvasId&#39;).drawImg(styleObj1).drawText(styleObj2)</span></span>
<span class="line"><span>  drawer.exportImg()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="注意事项-1" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项-1" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><ol><li>小程序中无法绘制网络图片到canvas上，需要通过downLoadFile 先下载图片到本地临时文件才可以绘制</li><li>通常需要绘制二维码到导出的图片上，有<a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fqrcode.html" title="https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html" target="_blank" rel="noreferrer">一种方式</a>导出二维码时，需要携带的参数必须做编码，而且有具体的长度（32可见字符）限制，可以借助服务端生成 <code>短链接</code> 的方式来解决</li></ol><h1 id="小程序-数据统计" tabindex="-1">小程序-数据统计 <a class="header-anchor" href="#小程序-数据统计" aria-label="Permalink to &quot;小程序-数据统计&quot;">​</a></h1>`,10),v=e(`<p>数据统计作为目前一种常用的分析用户行为的方式，小程序端也是必不可少的。小程序采取的曝光，点击数据埋点其实和h5原理是一样的。但是埋点作为一个和业务逻辑不相关的需求，我们如果在每一个点击事件，每一个生命周期加入各种埋点代码，则会干扰正常的业务逻辑，和使代码变的臃肿，笔者提供以下几种思路来解决数据埋点：</p><h2 id="设计一个埋点sdk" tabindex="-1">设计一个埋点sdk <a class="header-anchor" href="#设计一个埋点sdk" aria-label="Permalink to &quot;设计一个埋点sdk&quot;">​</a></h2><p>小程序的代码结构是，每一个 Page 中都有一个 Page 方法，接受一个包含生命周期函数，数据的 <code>业务逻辑对象</code> 包装这层数据，借助小程序的底层逻辑实现页面的业务逻辑。通过这个我们可以想到思路，对Page进行一次包装，篡改它的生命周期和点击事件，混入埋点代码，不干扰业务逻辑，只要做一些简单的配置即可埋点，简单的代码实现如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  </span></span>
<span class="line"><span>  代码仅供理解思路</span></span>
<span class="line"><span>  page = function(params) {</span></span>
<span class="line"><span>    let keys = params.keys()</span></span>
<span class="line"><span>    keys.forEach(v =&gt; {</span></span>
<span class="line"><span>        if (v === &#39;onLoad&#39;) {</span></span>
<span class="line"><span>          params[v] = function(options) {</span></span>
<span class="line"><span>            stat()   //曝光埋点代码</span></span>
<span class="line"><span>            params[v].call(this, options)</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        else if (v.includes(&#39;click&#39;)) {</span></span>
<span class="line"><span>          params[v] = funciton(event) { </span></span>
<span class="line"><span>            let data = event.dataset.config</span></span>
<span class="line"><span>            stat(data)  // 点击埋点</span></span>
<span class="line"><span>            param[v].call(this)</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>这种思路不光适用于埋点，也可以用来作全局异常处理，请求的统一处理等场景。</p><h2 id="分析接口" tabindex="-1">分析接口 <a class="header-anchor" href="#分析接口" aria-label="Permalink to &quot;分析接口&quot;">​</a></h2><p>对于特殊的一些业务，我们可以采取 <code>接口埋点</code>，什么叫接口埋点呢？很多情况下，我们有的api并不是多处调用的，只会在某一个特定的页面调用，通过这个思路我们可以分析出，该接口被请求，则这个行为被触发了，则完全可以通过服务端日志得出埋点数据，但是这种方式局限性较大，而且属于分析结果得出过程，可能存在误差，但可以作为一种思路了解一下。</p><h2 id="微信自定义数据分析" tabindex="-1"><a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fanalysis%2Findex.html%3Ft%3D18081011" title="https://developers.weixin.qq.com/miniprogram/analysis/index.html?t=18081011" target="_blank" rel="noreferrer">微信自定义数据分析</a> <a class="header-anchor" href="#微信自定义数据分析" aria-label="Permalink to &quot;[微信自定义数据分析](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fanalysis%2Findex.html%3Ft%3D18081011 &quot;https://developers.weixin.qq.com/miniprogram/analysis/index.html?t=18081011&quot;)&quot;">​</a></h2><p>微信本身提供的数据分析能力，微信本身提供了常规分析和自定义分析两种数据分析方式，在小程序后台配置即可。借助<code>小程序数据助手</code>这款小程序可以很方便的查看。</p><h1 id="小程序-工程化" tabindex="-1">小程序-工程化 <a class="header-anchor" href="#小程序-工程化" aria-label="Permalink to &quot;小程序-工程化&quot;">​</a></h1>`,10),k=e('<h2 id="工程化做什么" tabindex="-1">工程化做什么 <a class="header-anchor" href="#工程化做什么" aria-label="Permalink to &quot;工程化做什么&quot;">​</a></h2><p>目前的前端开发过程，工程化是必不可少的一环，那小程序工程化都需要做些什么呢，先看下目前小程序开发当中存在哪些问题需要解决：</p><ol><li>不支持 css预编译器,作为一种主流的 css解决方案，不论是 less,sass,stylus 都可以提升css效率</li><li>不支持引入npm包 （这一条，从微信公开课中听闻，微信准备支持）</li><li>不支持ES7等后续的js特性，好用的async await等特性都无法使用</li><li>不支持引入外部字体文件，只支持base64</li><li>没有 eslint 等代码检查工具</li></ol><h2 id="方案选型" tabindex="-1">方案选型 <a class="header-anchor" href="#方案选型" aria-label="Permalink to &quot;方案选型&quot;">​</a></h2><p>对于目前常用的工程化方案，webpack，rollup，parcel等来看，都常用与单页应用的打包和处理，而小程序天生是 “多页应用” 并且存在一些特定的配置。根据要解决的问题来看，无非是文件的编译，修改，拷贝这些处理，对于这些需求，我们想到基于流的 <code>gulp</code>非常的适合处理，并且相对于webpack配置多页应用更加简单。所以小程序工程化方案推荐使用 <code>gulp</code></p><h2 id="具体开发思路" tabindex="-1">具体开发思路 <a class="header-anchor" href="#具体开发思路" aria-label="Permalink to &quot;具体开发思路&quot;">​</a></h2><p>通过 gulp 的 task 实现：</p><ol><li>实时编译 less 文件至相应目录</li><li>引入支持async，await的运行时文件</li><li>编译字体文件为base64 并生成相应css文件，方便使用</li><li>依赖分析哪些地方引用了npm包，将npm包打成一个文件，拷贝至相应目录</li><li>检查代码规范</li></ol><p>上述实现起来其实并不是很难，但是这样的话就是一份纯粹的 gulp 构建脚本和 约定好的目录而已，每次都有一个新的小程序都来拷贝这份脚本来处理吗？显然不合适，那如何真正的实现 <code>小程序工程化</code> 呢？ 我们可能需要一个简单的脚手架，脚手架需要支持的功能：</p><ol><li>支持新建项目，创建Page，创建Component</li><li>支持内置构建脚本</li><li>支持发布小程序，也可以想办法接入Jenkins等工具做持续集成 (小程序持续集成后面会提) ...</li></ol><h1 id="小程序架构" tabindex="-1">小程序架构 <a class="header-anchor" href="#小程序架构" aria-label="Permalink to &quot;小程序架构&quot;">​</a></h1>',11),f=e(`<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd567f00fcc~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="architecture"></p><p>微信小程序的框架包含两部分 View 视图层、App Service逻辑层。View 层用来渲染页面结构，AppService 层用来逻辑处理、数据请求、接口调用。</p><p>它们在<strong>两个线程里</strong>运行。</p><p>它们在<strong>两个线程里</strong>运行。</p><p>它们在<strong>两个线程里</strong>运行。</p><p>视图层和逻辑层通过系统层的 JSBridage 进行通信，逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理。</p><p>补充</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd57d4375f0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="one-context"></p><p><strong>视图层使用 WebView 渲染，iOS 中使用自带 WKWebView，在 Android 使用腾讯的 x5 内核（基于 Blink）运行。</strong></p><p><strong>逻辑层使用在 iOS 中使用自带的 JSCore 运行，在 Android 中使用腾讯的 x5 内核（基于 Blink）运行。</strong></p><p><strong>开发工具使用 nw.js 同时提供了视图层和逻辑层的运行环境。</strong></p><p>在 Mac下 使用 js-beautify 对微信开发工具 @v1.02.1808080代码批量格式化：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>cd /Applications/wechatwebdevtools.app/Contents/Resources/package.nw</span></span>
<span class="line"><span>find . -type f -name &#39;*.js&#39; -not -path &quot;./node_modules/*&quot; -not -path -exec js-beautify -r -s 2 -p -f &#39;{}&#39; \\;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在 <code>js/extensions/appservice/index.js</code> 中找到：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> 267: function(a, b, c) {</span></span>
<span class="line"><span>    const d = c(8),</span></span>
<span class="line"><span>      e = c(227),</span></span>
<span class="line"><span>      f = c(226),</span></span>
<span class="line"><span>      g = c(228),</span></span>
<span class="line"><span>      h = c(229),</span></span>
<span class="line"><span>      i = c(230);</span></span>
<span class="line"><span>    var j = window.__global.navigator.userAgent,</span></span>
<span class="line"><span>      k = -1 !== j.indexOf(&#39;game&#39;);</span></span>
<span class="line"><span>    k || i(), window.__global.getNewWeixinJSBridge = (a) =&gt; {</span></span>
<span class="line"><span>      const {</span></span>
<span class="line"><span>        invoke: b</span></span>
<span class="line"><span>      } = f(a), {</span></span>
<span class="line"><span>        publish: c</span></span>
<span class="line"><span>      } = g(a), {</span></span>
<span class="line"><span>        subscribe: d,</span></span>
<span class="line"><span>        triggerSubscribeEvent: i</span></span>
<span class="line"><span>      } = h(a), {</span></span>
<span class="line"><span>        on: j,</span></span>
<span class="line"><span>        triggerOnEvent: k</span></span>
<span class="line"><span>      } = e(a);</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        invoke: b,</span></span>
<span class="line"><span>        publish: c,</span></span>
<span class="line"><span>        subscribe: d,</span></span>
<span class="line"><span>        on: j,</span></span>
<span class="line"><span>        get __triggerOnEvent() {</span></span>
<span class="line"><span>          return k</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        get __triggerSubscribeEvent() {</span></span>
<span class="line"><span>          return i</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }, window.WeixinJSBridge = window.__global.WeixinJSBridge = window.__global.getNewWeixinJSBridge(&#39;global&#39;), window.__global.WeixinJSBridgeMap = {</span></span>
<span class="line"><span>      __globalBridge: window.WeixinJSBridge</span></span>
<span class="line"><span>    }, __devtoolsConfig.online &amp;&amp; __devtoolsConfig.autoTest &amp;&amp; setInterval(() =&gt; {</span></span>
<span class="line"><span>      console.clear()</span></span>
<span class="line"><span>    }, 1e4);</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>      var l = new window.__global.XMLHttpRequest;</span></span>
<span class="line"><span>      l.responseType = &#39;text&#39;, l.open(&#39;GET&#39;, \`http://\${window.location.host}/calibration/\${Date.now()}\`, !0), l.send()</span></span>
<span class="line"><span>    } catch (a) {}</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>在 <code>js/extensions/gamenaitveview/index.js</code> 中找到：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  299: function(a, b, c) {</span></span>
<span class="line"><span>    &#39;use strict&#39;;</span></span>
<span class="line"><span>    Object.defineProperty(b, &#39;__esModule&#39;, {</span></span>
<span class="line"><span>      value: !0</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    var d = c(242),</span></span>
<span class="line"><span>      e = c(241),</span></span>
<span class="line"><span>      f = c(243),</span></span>
<span class="line"><span>      g = c(244);</span></span>
<span class="line"><span>    window.WeixinJSBridge = {</span></span>
<span class="line"><span>      on: d.a,</span></span>
<span class="line"><span>      invoke: e.a,</span></span>
<span class="line"><span>      publish: f.a,</span></span>
<span class="line"><span>      subscribe: g.a</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>在 <code>js/extensions/pageframe/index.js</code>中找到：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>317: function(a, b, c) {</span></span>
<span class="line"><span>    &#39;use strict&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function d() {</span></span>
<span class="line"><span>      window.WeixinJSBridge = {</span></span>
<span class="line"><span>        on: e.a,</span></span>
<span class="line"><span>        invoke: f.a,</span></span>
<span class="line"><span>        publish: g.a,</span></span>
<span class="line"><span>        subscribe: h.a</span></span>
<span class="line"><span>      }, k.a.init();</span></span>
<span class="line"><span>      let a = document.createEvent(&#39;UIEvent&#39;);</span></span>
<span class="line"><span>      a.initEvent(&#39;WeixinJSBridgeReady&#39;, !1, !1), document.dispatchEvent(a), i.a.init()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Object.defineProperty(b, &#39;__esModule&#39;, {</span></span>
<span class="line"><span>      value: !0</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    var e = c(254),</span></span>
<span class="line"><span>      f = c(253),</span></span>
<span class="line"><span>      g = c(255),</span></span>
<span class="line"><span>      h = c(256),</span></span>
<span class="line"><span>      i = c(86),</span></span>
<span class="line"><span>      j = c(257),</span></span>
<span class="line"><span>      k = c.n(j);</span></span>
<span class="line"><span>    &#39;complete&#39; === document.readyState ? d() : window.addEventListener(&#39;load&#39;, function() {</span></span>
<span class="line"><span>      d()</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  },</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>我们都看到了 WeixinJSBridge 的定义。分别都有 <code>on</code>、<code>invoke</code>、<code>publish</code>、<code>subscribe</code> 这个几个关键方法。</p><p>拿 <code>invoke</code> 举例，在 <code>js/extensions/appservice/index.js</code>中发现这段代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>f (!r) p[b] = s, f.send({</span></span>
<span class="line"><span>    command: &#39;APPSERVICE_INVOKE&#39;,</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>        api: c,</span></span>
<span class="line"><span>        args: e,</span></span>
<span class="line"><span>        callbackID: b</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在 <code>js/extensions/pageframe/index.js</code> 中发现这段代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>g[d] = c, e.a.send({</span></span>
<span class="line"><span>    command: &#39;WEBVIEW_INVOKE&#39;,</span></span>
<span class="line"><span>    data: {</span></span>
<span class="line"><span>        api: a,</span></span>
<span class="line"><span>        args: b,</span></span>
<span class="line"><span>        callbackID: d</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>简单的分析得知：字段 <code>command</code> 用来区分行为，<code>invoke</code> 用来调用 Native 的 Api。在不同的来源要使用不同的前缀。<code>data</code> 里面包含 Api 名，参数。另外 <code>callbackID</code> 指定接受回调的方法句柄。Appservice 和 Webview 使用的通信协议是一致的。</p><p>我们不能在代码里使用 BOM 和 DOM 是因为根本没有，另一方面也不希望 JS 代码直接操作视图。</p><p>在开发工具中 <code>remote-helper.js</code> 中找到了这样的代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const vm = require(&quot;vm&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const vmGlobal = {</span></span>
<span class="line"><span>    require: undefined,</span></span>
<span class="line"><span>    eval: undefined,</span></span>
<span class="line"><span>    process: undefined,</span></span>
<span class="line"><span>    setTimeout(...args) {</span></span>
<span class="line"><span>        //...省略代码</span></span>
<span class="line"><span>        return timerCount;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    clearTimeout(id) {</span></span>
<span class="line"><span>        const timer = timers[id];</span></span>
<span class="line"><span>        if (timer) {</span></span>
<span class="line"><span>            clearTimeout(timer);</span></span>
<span class="line"><span>            delete timers[id];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    setInterval(...args) {</span></span>
<span class="line"><span>        //...省略代码</span></span>
<span class="line"><span>        return timerCount;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    clearInterval(id) {</span></span>
<span class="line"><span>        const timer = timers[id];</span></span>
<span class="line"><span>        if (timer) {</span></span>
<span class="line"><span>            clearInterval(timer);</span></span>
<span class="line"><span>            delete timers[id];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    console: (() =&gt; {</span></span>
<span class="line"><span>        //...省略代码</span></span>
<span class="line"><span>        return consoleClone;</span></span>
<span class="line"><span>    })()</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const jsVm = vm.createContext(vmGlobal);</span></span>
<span class="line"><span>// 省略大量代码...</span></span>
<span class="line"><span>function loadCode(filePath, sourceURL, content) {</span></span>
<span class="line"><span>    let ret;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        const script = typeof content === &#39;string&#39; ? content : fs.readFileSync(filePath, &#39;utf-8&#39;).toString();</span></span>
<span class="line"><span>        ret = vm.runInContext(script, jsVm, {</span></span>
<span class="line"><span>            filename: sourceURL,</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    catch (e) {</span></span>
<span class="line"><span>        // something went wrong in user code</span></span>
<span class="line"><span>        console.error(e);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return ret;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p>这样的分层设计显然是有意为之的，它的中间层完全控制了程序对于界面进行的操作， 同时对于传递的数据和响应时间也能做到监控。一方面程序的行为受到了极大限制， 另一方面微信可以确保他们对于小程序内容和体验有绝对的控制。</p><p>这样的结构也说明了小程序的动画和绘图 API 被设计成生成一个最终对象而不是一步一步执行的样子， 原因就是 Json 格式的数据传递和解析相比与原生 API 都是损耗不菲的，如果频繁调用很可能损耗过多性能，进而影响用户体验。</p><h2 id="下载小程序完整包" tabindex="-1">下载小程序完整包 <a class="header-anchor" href="#下载小程序完整包" aria-label="Permalink to &quot;下载小程序完整包&quot;">​</a></h2><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd56a0887d0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="download"></p><h2 id="app-service-life-cylce" tabindex="-1">App Service - Life Cylce <a class="header-anchor" href="#app-service-life-cylce" aria-label="Permalink to &quot;App Service - Life Cylce&quot;">​</a></h2><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd58981205e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="lifecycle"></p><h2 id="面试题" tabindex="-1">面试题 <a class="header-anchor" href="#面试题" aria-label="Permalink to &quot;面试题&quot;">​</a></h2><p><strong>1.动画需要绑定在 data 上，而绘图却不用。你觉得是为什么呢？</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var context = wx.createCanvasContext(&#39;firstCanvas&#39;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>context.setStrokeStyle(&quot;#00ff00&quot;)</span></span>
<span class="line"><span>context.setLineWidth(5)</span></span>
<span class="line"><span>context.rect(0, 0, 200, 200)</span></span>
<span class="line"><span>context.stroke()</span></span>
<span class="line"><span>context.setStrokeStyle(&quot;#ff0000&quot;)</span></span>
<span class="line"><span>context.setLineWidth(2)</span></span>
<span class="line"><span>context.moveTo(160, 100)</span></span>
<span class="line"><span>context.arc(100, 100, 60, 0, 2 * Math.PI, true)</span></span>
<span class="line"><span>context.moveTo(140, 100)</span></span>
<span class="line"><span>context.arc(100, 100, 40, 0, Math.PI, false)</span></span>
<span class="line"><span>context.moveTo(85, 80)</span></span>
<span class="line"><span>context.arc(80, 80, 5, 0, 2 * Math.PI, true)</span></span>
<span class="line"><span>context.moveTo(125, 80)</span></span>
<span class="line"><span>context.arc(120, 80, 5, 0, 2 * Math.PI, true)</span></span>
<span class="line"><span>context.stroke()</span></span>
<span class="line"><span>context.draw()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Page({</span></span>
<span class="line"><span>  data: {</span></span>
<span class="line"><span>    animationData: {}</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  onShow: function(){</span></span>
<span class="line"><span>    var animation = wx.createAnimation({</span></span>
<span class="line"><span>      duration: 1000,</span></span>
<span class="line"><span>     timingFunction: &#39;ease&#39;,</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    this.animation = animation</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    animation.scale(2,2).rotate(45).step()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    this.setData({</span></span>
<span class="line"><span>      animationData:animation.export()</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>2.小程序的 Http Rquest 请求是不是用的浏览器 Fetch API?</strong></p><p>知识点考察</p><ul><li>知道 Request 是由 Native 实现的</li><li>JSCore 是不带 Http Request、Websocket、Storage等功能的，那是 Webkit 带的</li><li>小程序的 <code>wx.request</code> 是不是遵循 fetch API 规范实现的呢？答案，显然不是。因为没有 <code>Promise</code></li></ul><h1 id="view-wxml" tabindex="-1">View - WXML <a class="header-anchor" href="#view-wxml" aria-label="Permalink to &quot;View - WXML&quot;">​</a></h1>`,42),x=e('<p>WXML（WeiXin Markup Language）</p><ul><li>支持数据绑定</li><li>支持逻辑算术、运算</li><li>支持模板、引用</li><li>支持添加事件（bindtap）</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd55da9d940~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WXML"></p><p>Wxml编译器：Wcc 把 Wxml文件 转为 JS</p><p>执行方式：Wcc index.wxml</p><p><strong>使用 Virtual DOM，进行局部更新</strong></p><h1 id="view-wxss" tabindex="-1">View - WXSS <a class="header-anchor" href="#view-wxss" aria-label="Permalink to &quot;View - WXSS&quot;">​</a></h1>',7),w=e(`<p>WXSS(WeiXin Style Sheets)</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd55df8f76a~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WXSS"></p><p>wxss编译器：wcsc 把wxss文件转化为 js</p><p>执行方式： wcsc index.wxss</p><h2 id="支持大部分css特性" tabindex="-1">支持大部分CSS特性 <a class="header-anchor" href="#支持大部分css特性" aria-label="Permalink to &quot;支持大部分CSS特性&quot;">​</a></h2><p>亲测包含但不限于如下内容：</p><ul><li>Transition</li><li>Animation <ul><li>Keyframes</li></ul></li><li>border-radius</li><li>calc()</li><li>选择器，除了<a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fframework%2Fview%2Fwxss.html" title="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html" target="_blank" rel="noreferrer">官方文档</a>列出的，其实还支持 <ul><li>element&gt;element</li><li>element+element</li><li>element element</li><li>element:first-letter</li><li>element:first-line</li><li>element:first-child</li><li>element:last-child</li><li>element~element</li><li>element:first-of-type</li><li>element:last-of-type</li><li>element:only-of-type</li><li>element:only-child</li><li>element:nth-child(n)</li><li>element:nth-last-child(n)</li><li>element:nth-of-type(n)</li><li>element:nth-last-of-type(n)</li><li>:root</li><li>element:empty</li><li>:not(element)</li></ul></li><li>iconfont</li></ul><p>建议 Css3 的特性都可以做一下尝试。</p><h2 id="尺寸单位-rpx" tabindex="-1">尺寸单位 rpx <a class="header-anchor" href="#尺寸单位-rpx" aria-label="Permalink to &quot;尺寸单位 rpx&quot;">​</a></h2><p>rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为 750rpx。公式：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const dsWidth = 750</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const screenHeightOfRpx = function () {</span></span>
<span class="line"><span>  return 750 / env.screenWidth * env.screenHeight</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const rpxToPx = function (rpx) {</span></span>
<span class="line"><span>  return env.screenWidth / 750 * rpx</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const pxToRpx = function (px) {</span></span>
<span class="line"><span>  return 750 / env.screenWidth * px</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><table><thead><tr><th>设备</th><th>rpx换算px (屏幕宽度/750)</th><th>px换算rpx (750/屏幕宽度)</th></tr></thead><tbody><tr><td>iPhone5</td><td>1rpx = 0.42px</td><td>1px = 2.34rpx</td></tr><tr><td>iPhone6</td><td>1rpx = 0.5px</td><td>1px = 2rpx</td></tr><tr><td>iPhone6 Plus</td><td>1rpx = 0.552px</td><td>1px = 1.81rpx</td></tr></tbody></table><p>可以了解一下 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmpvue%2Fpx2rpx-loader" title="https://github.com/mpvue/px2rpx-loader" target="_blank" rel="noreferrer">pr2rpx-loader</a> 这个库。</p><h2 id="样式导入" tabindex="-1">样式导入 <a class="header-anchor" href="#样式导入" aria-label="Permalink to &quot;样式导入&quot;">​</a></h2><p>使用 <code>@import</code>语句可以导入外联样式表，<code>@import</code>后跟需要导入的外联样式表的相对路径，用 <code>;</code> 表示语句结束。</p><h2 id="内联样式" tabindex="-1">内联样式 <a class="header-anchor" href="#内联样式" aria-label="Permalink to &quot;内联样式&quot;">​</a></h2><p>静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，<strong>请尽量避免将静态的样式写进 style 中，以免影响渲染速度</strong>。</p><h2 id="全局样式与局部样式" tabindex="-1">全局样式与局部样式 <a class="header-anchor" href="#全局样式与局部样式" aria-label="Permalink to &quot;全局样式与局部样式&quot;">​</a></h2><p>定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。</p><h2 id="iconfont" tabindex="-1">iconfont <a class="header-anchor" href="#iconfont" aria-label="Permalink to &quot;iconfont&quot;">​</a></h2><p><strong>截止20180810</strong></p><p>小程序未来有计划支持字体。参考<a href="https://link.juejin.cn/?target=http%3A%2F%2Fdaxue.qq.com%2Fcontent%2Fcontent%2Fid%2F4113" title="http://daxue.qq.com/content/content/id/4113" target="_blank" rel="noreferrer">微信公开课</a>。</p><p>小程序开发与平时 Web开发类似，也可以使用字体图标，但是 <code>src:url()</code> 无论本地还是远程地址都不行，base64 值则都是可以显示的。</p><p>将 ttf 文件转换成 base64。打开这个平台 <a href="https://link.juejin.cn/?target=http%3A%2F%2Ftransfonter.org%2F%25E3%2580%2582%25E7%2582%25B9%25E5%2587%25BB" title="http://transfonter.org/%E3%80%82%E7%82%B9%E5%87%BB" target="_blank" rel="noreferrer">transfonter.org/。点击</a> Add fonts 按钮，加载ttf格式的那个文件。将下边的 base64 encode 改为 on。点击 Convert 按钮进行转换，转换后点击 download 下载。</p><p>复制下载的压缩文件中的 stylesheet.css 的内容到 font.wxss ，并且将 icomoon 中的 style.css 除了 @font-face 所有的代码也复制到 font.wxss 并将i选择器换成 .iconfont，最后：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;text class=&quot;iconfont icon-home&quot; style=&quot;font-size:50px;color:red&quot;&gt;&lt;/text&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="view-component" tabindex="-1">View - Component <a class="header-anchor" href="#view-component" aria-label="Permalink to &quot;View - Component&quot;">​</a></h1>`,27),_=l("p",null,"小程序提供了一系列组件用于开发业务功能，按照功能与HTML5的标签进行对比如下：",-1),q=l("p",null,[l("img",{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd61f6cc3dd~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image",alt:"Component"})],-1),y=l("p",null,"小程序的组件基于Web Component标准",-1),F=l("p",null,"使用Polymer框架实现Web Component",-1),j=l("h1",{id:"view-native-component",tabindex:"-1"},[i("View - Native Component "),l("a",{class:"header-anchor",href:"#view-native-component","aria-label":'Permalink to "View - Native Component"'},"​")],-1),C=e('<p>目前Native实现的组件有</p><ul><li><p>cavnas</p></li><li><p>video</p></li><li><p>map</p></li><li><p>textarea</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd63ae856a7~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="Native Component"></p></li></ul><p>Native组件层在 WebView 层之上。这目前带来了一些问题：</p><ul><li>Native 实现的组件会遮挡其他组件</li><li>WebView 渲染出来的视图在滚动时，Native 实现的组件需要更新位置，这会带来性能问题，在安卓机器上比较明显</li><li>小程序原生组件 <code>cover-view</code> 可以覆盖 cavnas video 等，但是也有一下弊端，比如在 cavnas 上覆盖 <code>cover-view</code>，就会发现坐标系不统一处理麻烦</li></ul><h1 id="目前小程序的问题或限制" tabindex="-1">目前小程序的问题或限制 <a class="header-anchor" href="#目前小程序的问题或限制" aria-label="Permalink to &quot;目前小程序的问题或限制&quot;">​</a></h1>',5),P=e('<p><strong>截止20180810</strong></p><p>包含但不限于：</p><ul><li><p>小程序仍然使用 WebView 渲染，并非原生渲染。（部分原生）</p></li><li><p>服务端接口返回的头无法执行，比如：Set-Cookie。</p></li><li><p>依赖浏览器环境的 JS 库不能使用。</p></li><li><p>不能使用 npm，但是可以自搭构建工具或者使用 mpvue。（未来官方有计划支持）</p></li><li><p>不能使用 ES7，可以自己用babel+webpack自搭或者使用 mpvue。</p></li><li><p>不支持使用自己的字体（未来官方计划支持）。</p></li><li><p>可以用 base64 的方式来使用 iconfont。</p></li><li><p>小程序不能发朋友圈（可以通过保存图片到本地，发图片到朋友前。二维码可以使用<a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fqrcode.html" title="https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html" target="_blank" rel="noreferrer">B接口</a>）。</p></li><li><p>获取<a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fqrcode.html" title="https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html" target="_blank" rel="noreferrer">二维码/小程序</a>接口的限制。</p><ul><li>B 接口 scene 最大32个可见字符。</li><li>AC 接口总共生成的码数量限制为 100,000，请谨慎调用。</li><li>真机扫描二维码只能跳转到线上版本，所以测试环境下只可通过开发者工具的通过二维码编译进行调试。</li><li>没有发布到线上版本的小程序页面路径会导致生成二维码失败，需要先将添加了页面的小程序发布到线上版本。</li></ul></li><li><p>小程序推送只能使用“服务通知” 而且需要用户主动触发提交 formId，formId 只有7天有效期。（现在的做法是在每个页面都放入form并且隐藏以此获取更多的 formId。后端使用原则为：优先使用有效期最短的）</p></li><li><p>小程序大小限制 2M，分包总计不超过 8M</p></li><li><p>转发（分享）小程序不能拿到成功结果，原来可以。<a href="https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMjM5NDAwMTA2MA%3D%3D%26mid%3D2695730124%26idx%3D1%26sn%3D666a448b047d657350de7684798f48d3%26chksm%3D83d74a07b4a0c311569a748f4d11a5ebcce3ba8f6bd5a4b3183a4fea0b3442634a1c71d3cdd0%26scene%3D21%23wechat_redirect" title="https://mp.weixin.qq.com/s?__biz=MjM5NDAwMTA2MA==&amp;mid=2695730124&amp;idx=1&amp;sn=666a448b047d657350de7684798f48d3&amp;chksm=83d74a07b4a0c311569a748f4d11a5ebcce3ba8f6bd5a4b3183a4fea0b3442634a1c71d3cdd0&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">链接</a>（小游戏造的孽）</p></li><li><p>拿到相同的 unionId 必须绑在同一个开放平台下。开放平台绑定限制：</p><ul><li>50个移动应用</li><li>10个网站</li><li>50个同主体公众号</li><li>5个不同主体公众号</li><li>50个同主体小程序</li><li>5个不同主体小程序</li></ul></li><li><p>公众号关联小程序，<a href="https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fintroduction%2F%23%25E5%2585%25AC%25E4%25BC%2597%25E5%258F%25B7%25E5%2585%25B3%25E8%2581%2594%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F" title="https://developers.weixin.qq.com/miniprogram/introduction/#%E5%85%AC%E4%BC%97%E5%8F%B7%E5%85%B3%E8%81%94%E5%B0%8F%E7%A8%8B%E5%BA%8F" target="_blank" rel="noreferrer">链接</a></p><ul><li>所有公众号都可以关联小程序。</li><li>一个公众号可关联10个同主体的小程序，3个不同主体的小程序。</li><li>一个小程序可关联500个公众号。</li><li>公众号一个月可新增关联小程序13次，小程序一个月可新增关联500次。</li></ul></li><li><p>一个公众号关联的10个同主体小程序和3个非同主体小程序可以互相跳转</p></li><li><p>品牌搜索不支持金融、医疗</p></li><li><p>小程序授权需要用户主动点击</p></li><li><p>小程序不提供测试 <strong>access_token</strong></p></li><li><p>安卓系统下，小程序授权获取用户信息之后，删除小程序再重新获取，并重新授权，得到旧签名，导致第一次授权失败</p></li><li><p>开发者工具上，授权获取用户信息之后，如果清缓存选择全部清除，则即使使用了wx.checkSession，并且在session_key有效期内，授权获取用户信息也会得到新的session_key</p></li></ul><h2 id="小程序http2支持情况" tabindex="-1">小程序HTTP2支持情况 <a class="header-anchor" href="#小程序http2支持情况" aria-label="Permalink to &quot;小程序HTTP2支持情况&quot;">​</a></h2><h3 id="http2支持情况-模拟器与真机均不支持" tabindex="-1">HTTP2支持情况：模拟器与真机均不支持 <a class="header-anchor" href="#http2支持情况-模拟器与真机均不支持" aria-label="Permalink to &quot;HTTP2支持情况：模拟器与真机均不支持&quot;">​</a></h3><p>为了验证小程序对HTTP的支持适配情况，我找了两个服务器做测试，一个是网上搜索到支持HTTP2的服务器，一个是我本地起的一个HTTP2服务器。测试中所有请求方法均使用 <code>wx.request</code>。</p><ol><li><p>网上支持HTTP2的服务器：<code>HTTPs://www.snel.com:443</code></p></li><li><p>在Chrome上查看该服务器为 HTTP2</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd65fbde315~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WechatIMG11"></p></li><li><p>在模拟器上请求该接口，<code>请求头</code>的HTTP版本为HTTP1.1，模拟器不支持HTTP2</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd6aa018b35~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WechatIMG12"></p></li><li><p>由于小程序线上环境需要在项目管理里配置请求域名，而这个域名不是我们需要的请求域名，没必要浪费一个域名位置，所以打开不验证域名，TSL 等选项请求该接口，通过抓包工具表现与模拟器相同</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd6d67dc3a6~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WechatIMG14"></p></li></ol><h3 id="http2服务器需要对小程序做兼容性适配" tabindex="-1">HTTP2服务器需要对小程序做兼容性适配 <a class="header-anchor" href="#http2服务器需要对小程序做兼容性适配" aria-label="Permalink to &quot;HTTP2服务器需要对小程序做兼容性适配&quot;">​</a></h3><p>由上可以看出，在真机与模拟器都不支持 HTTP2，但是都是成功请求的，并且 <code>响应头</code> 里的 HTTP 版本都变成了HTTP1.1 版本，说明服务器对 HTTP1.1 做了兼容性适配。</p><ol><li><p>本地新启一个 node 服务器，返回 JSON 为请求的 HTTP 版本</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd6d94de216~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WechatIMG16"></p></li><li><p>如果服务器只支持 HTTP2，在模拟器请求时发生了一个 <code>ALPN</code> 协议的错误。并且提醒使用适配 HTTP1</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd6dfe717d8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WechatIMG8"></p></li><li><p>当把服务器的 <code>allowHTTP1</code>，设置为 <code>true</code>，并在请求时处理相关相关请求参数后，模拟器能正常访问接口，并打印出对应的 HTTP 请求版本</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd70704cc04~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="WechatIMG15"></p></li></ol><h1 id="授权获取用户信息流程" tabindex="-1">授权获取用户信息流程 <a class="header-anchor" href="#授权获取用户信息流程" aria-label="Permalink to &quot;授权获取用户信息流程&quot;">​</a></h1>',11),A=e('<p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd745ae6210~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt=""></p><ul><li>session_key 有有效期，有效期并没有被告知开发者，只知道用户越频繁使用小程序，session_key 有效期越长</li><li>在调用 wx.login 时会直接更新 session_key，导致旧 session_key 失效</li><li>小程序内先调用 wx.checkSession 检查登录态，并保证没有过期的 session_key 不会被更新，再调用 wx.login 获取 code。接着用户授权小程序获取用户信息，小程序拿到加密后的用户数据，把加密数据和 code 传给后端服务。后端通过 code 拿到 session_key 并解密数据，将解密后的用户信息返回给小程序</li></ul><p><strong>面试题：先授权获取用户信息再 login 会发生什么？</strong></p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd7b715d456~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt=""> <img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd7d0e907dc~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt=""></p><ul><li>用户授权时，开放平台使用旧的 session_key 对用户信息进行加密。调用 wx.login 重新登录，会刷新 session_key，这时后端服务从开放平台获取到新 session_key，但是无法对老 session_key 加密过的数据解密，用户信息获取失败</li><li>在用户信息授权之前先调用 wx.checkSession 呢？wx.checkSession 检查登录态，并且保证 wx.login 不会刷新 session_key，从而让后端服务正确解密数据。但是这里存在一个问题，如果小程序较长时间不用导致 session_key 过期，则 wx.login 必定会重新生成 session_key，从而再一次导致用户信息解密失败。</li></ul><h1 id="性能优化" tabindex="-1">性能优化 <a class="header-anchor" href="#性能优化" aria-label="Permalink to &quot;性能优化&quot;">​</a></h1>',6),T=e(`<p><strong>我们知道view部分是运行在webview上的，所以前端领域的大多数优化方式都有用。</strong></p><p><strong>我们知道view部分是运行在webview上的，所以前端领域的大多数优化方式都有用。</strong></p><p><strong>我们知道view部分是运行在webview上的，所以前端领域的大多数优化方式都有用。</strong></p><h2 id="加载优化" tabindex="-1">加载优化 <a class="header-anchor" href="#加载优化" aria-label="Permalink to &quot;加载优化&quot;">​</a></h2><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd7fd0c7cb2~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="preload"></p><p>代码包的大小是最直接影响小程序加载启动速度的因素。代码包越大不仅下载速度时间长，业务代码注入时间也会变长。所以最好的优化方式就是减少代码包的大小。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd804824c9c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="load-time-series"></p><p>小程序加载的三个阶段的表示。</p><p><strong>优化方式</strong></p><ul><li>代码压缩。</li><li>及时清理无用代码和资源文件。</li><li>减少代码包中的图片等资源文件的大小和数量。</li><li>分包加载。</li></ul><p><strong>首屏加载的体验优化建议</strong></p><ul><li>提前请求: 异步数据请求不需要等待页面渲染完成。</li><li>利用缓存: 利用 storage API 对异步请求数据进行缓存，二次启动时先利用缓存数据渲染页面，在进行后台更新。</li><li>避免白屏：先展示页面骨架页和基础内容。</li><li>及时反馈：即时地对需要用户等待的交互操作给出反馈，避免用户以为小程序无响应。</li></ul><h3 id="使用分包加载优化" tabindex="-1">使用分包加载优化 <a class="header-anchor" href="#使用分包加载优化" aria-label="Permalink to &quot;使用分包加载优化&quot;">​</a></h3><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd8ac3f82ae~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="sub-package"></p><p>在构建小程序分包项目时，构建会输出一个或多个功能的分包，其中每个分包小程序必定含有一个主包，所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本，而分包则是根据开发者的配置进行划分。</p><p>在小程序启动时，默认会下载主包并启动主包内页面，如果用户需要打开分包内某个页面，客户端会把对应分包下载下来，下载完成后再进行展示。</p><p>优点：</p><ul><li>对开发者而言，能使小程序有更大的代码体积，承载更多的功能与服务</li><li>对用户而言，可以更快地打开小程序，同时在不影响启动速度前提下使用更多功能</li></ul><p>限制：</p><ul><li>整个小程序所有分包大小不超过 8M</li><li>单个分包/主包大小不能超过 2M</li></ul><p><strong>原生分包加载的配置</strong> 假设支持分包的小程序目录结构如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├── app.js</span></span>
<span class="line"><span>├── app.json</span></span>
<span class="line"><span>├── app.wxss</span></span>
<span class="line"><span>├── packageA</span></span>
<span class="line"><span>│   └── pages</span></span>
<span class="line"><span>│       ├── cat</span></span>
<span class="line"><span>│       └── dog</span></span>
<span class="line"><span>├── packageB</span></span>
<span class="line"><span>│   └── pages</span></span>
<span class="line"><span>│       ├── apple</span></span>
<span class="line"><span>│       └── banana</span></span>
<span class="line"><span>├── pages</span></span>
<span class="line"><span>│   ├── index</span></span>
<span class="line"><span>│   └── logs</span></span>
<span class="line"><span>└── utils</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>开发者通过在 app.json subPackages 字段声明项目分包结构：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;pages&quot;:[</span></span>
<span class="line"><span>    &quot;pages/index&quot;,</span></span>
<span class="line"><span>    &quot;pages/logs&quot;</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;subPackages&quot;: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      &quot;root&quot;: &quot;packageA&quot;,</span></span>
<span class="line"><span>      &quot;pages&quot;: [</span></span>
<span class="line"><span>        &quot;pages/cat&quot;,</span></span>
<span class="line"><span>        &quot;pages/dog&quot;</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    }, {</span></span>
<span class="line"><span>      &quot;root&quot;: &quot;packageB&quot;,</span></span>
<span class="line"><span>      &quot;pages&quot;: [</span></span>
<span class="line"><span>        &quot;pages/apple&quot;,</span></span>
<span class="line"><span>        &quot;pages/banana&quot;</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><strong>分包原则</strong></p><ul><li>声明 subPackages 后，将按 subPackages 配置路径进行打包，subPackages 配置路径外的目录将被打包到 app（主包） 中</li><li>app（主包）也可以有自己的 pages（即最外层的 pages 字段</li><li>subPackage 的根目录不能是另外一个 subPackage 内的子目录</li><li>首页的 TAB 页面必须在 app（主包）内</li></ul><p><strong>引用原则</strong></p><ul><li>packageA 无法 require packageB JS 文件，但可以 require app、自己 package 内的 JS 文件</li><li>packageA 无法 import packageB 的 template，但可以 require app、自己 package 内的 template</li><li>packageA 无法使用 packageB 的资源，但可以使用 app、自己 package 内的资源</li></ul><p><strong>官方即将推出</strong> 分包预加载</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd8b2167186~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="preload-sub-package"></p><p>独立分包</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd8b7610a45~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="single-sub-package"></p><h2 id="渲染性能优化" tabindex="-1">渲染性能优化 <a class="header-anchor" href="#渲染性能优化" aria-label="Permalink to &quot;渲染性能优化&quot;">​</a></h2><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd8e28809dd~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="render"></p><ul><li><p>每次 setData 的调用都是一次进程间通信过程，通信开销与 setData 的数据量正相关。</p></li><li><p>setData 会引发视图层页面内容的更新，这一耗时操作一定时间中会阻塞用户交互。</p></li><li><p><strong>setData 是小程序开发使用最频繁，也是最容易引发性能问题的。</strong></p></li></ul><p><strong>避免不当使用 setData</strong></p><ul><li>使用 data 在方法间共享数据，<strong>可能增加 setData 传输的数据量。</strong>。data 应仅包括与页面渲染相关的数据。</li><li>使用 setData 传输大量数据，**通讯耗时与数据正相关，页面更新延迟可能造成页面更新开销增加。**仅传输页面中发生变化的数据，使用 setData 的特殊 key 实现局部更新。</li><li>短时间内频繁调用 setData，**操作卡顿，交互延迟，阻塞通信，页面渲染延迟。**避免不必要的 setData，对连续的setData调用进行合并。</li><li>在后台页面进行 setData，**抢占前台页面的渲染资源。**页面切入后台后的 setData 调用，延迟到页面重新展示时执行。</li></ul><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd57d4375f0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="one-context"></p><p><strong>避免不当使用onPageScroll</strong></p><ul><li>只在有必要的时候监听 pageScroll 事件。不监听，则不会派发。</li><li>避免在 onPageScroll 中执行复杂逻辑</li><li>避免在 onPageScroll 中频繁调用 setData</li><li>避免滑动时频繁查询节点信息（SelectQuery）用以判断是否显示，部分场景建议使用节点布局橡胶状态监听（inersectionObserver）替代</li></ul><p><strong>使用自定义组件</strong></p><p>在需要频繁更新的场景下，自定义组件的更新只在组件内部进行，不受页面其他部分内容复杂性影响。</p><h1 id="官方小程序技术能力规划" tabindex="-1">官方小程序技术能力规划 <a class="header-anchor" href="#官方小程序技术能力规划" aria-label="Permalink to &quot;官方小程序技术能力规划&quot;">​</a></h1>`,43),S=e('<h2 id="自定义组件2-0" tabindex="-1">自定义组件2.0 <a class="header-anchor" href="#自定义组件2-0" aria-label="Permalink to &quot;自定义组件2.0&quot;">​</a></h2><p>小程序的几个页面间，存在一些相同或是类似的区域，这时候可以把这些区域逻辑封装成一个自定义组件，代码就可以重用，或者对于比较独立逻辑，也可以把它封装成一个自定义组件，也就是微信去年发布的自定义组件，它让代码得到复用、减少代码量，更方便模块化，优化代码架构组织，也使得模块清晰，后期更好地维护，从而保证更好的性能。</p><p>但微信打算在原来的基础上推出的自定义组件 2.0，它将拥有更高级的性能：</p><ul><li>usingComponents 计划支持全局定义和通配符定义：这意味着不用在每个页面反复定义，可以批量导入目录下的所有自定义组件</li><li>计划支持类似 Computed 和 watch 的功能，它能使代码逻辑更清晰</li><li>计划支持 Component 构造器插件，在实例化一个自定义组件的时候，允许你在构造器的这个阶段，加入一些逻辑，方便进行一些扩展，甚至是可以扩展成 Vue 的语法</li></ul><h2 id="npm支持" tabindex="-1">npm支持 <a class="header-anchor" href="#npm支持" aria-label="Permalink to &quot;npm支持&quot;">​</a></h2><p>目前小程序开发的痛点是：开源组件要手动复制到项目，后续更新组件也需要手动操作。不久的将来，小程序将支持npm包管理，有了这个之后，想要引入一些开源的项目就变得很简单了，只要在项目里面声明，然后用简单的命令安装，就可以使用了。</p><h2 id="官方自定义组件" tabindex="-1">官方自定义组件 <a class="header-anchor" href="#官方自定义组件" aria-label="Permalink to &quot;官方自定义组件&quot;">​</a></h2><p>微信小程序团队表示，他们在考虑推出一些官方自定义组件，为什么不内置到基础库里呢？因为内置组件要提供给开发者，这个组件一定是开发者很难实现或者是无法实现的一个能力。所以他们更倾向于封装成自定义组件，想基于这些内置组件里，封装一些比较常见的、交互逻辑比较复杂的组件给大家使用，让大家更容易开发。类似弹幕组件，开发者就不用关注弹幕怎么飘，可以节省开发者的开发成本。</p><p>同时，他们也想给开发者提供一些规范和一些模板，让开发者设计出好用的自定义组件，更好地被大家去使用。</p><h2 id="添加体验评分" tabindex="-1">添加体验评分 <a class="header-anchor" href="#添加体验评分" aria-label="Permalink to &quot;添加体验评分&quot;">​</a></h2><p>当小程序加载太慢时，可能会导致用户的流失，而小程序的开发者可能会面临着不知道如何定位问题或不知如何解决问题的困境。</p><p>为此，小程序即将推出一个体验评分的功能，这是为了帮助开发者可以检查出小程序有一些什么体验不好的地方，也会同时给出一份优化的指引建议。</p><h2 id="原生组件同层渲染" tabindex="-1">原生组件同层渲染 <a class="header-anchor" href="#原生组件同层渲染" aria-label="Permalink to &quot;原生组件同层渲染&quot;">​</a></h2><p>小程序在最初的技术选型时，引入了原生组件的概念，因为原生组件可以使小程序的能力更加丰富，比如地图、音视频的能力，但是原生组件是由客户端原生渲染的，导致了原生组件的层级是最高的，开发者很容易遇到打开调试的问题，发现视频组件挡在了 vConsole 上。</p><p>为了解决这个问题，当时微信做了一个过渡的方案：cover-view。cover-view可以覆盖在原生组件之上，这一套方案解决了大部分的需求场景。比如说视频组件上很多的按钮、标题甚至还有动画的弹幕，这些都是用 cover-view 去实现的，但它还是没有完全解决原生组件的开发体验问题，因为 cover-view 有一些限制：</p><ul><li>无法与其他组件混在一起渲染</li><li>没有完整的触摸事件</li><li>cover-view 对样式的表现有差异</li><li>cover-view 对样式的支持度不够高</li></ul><p>因此微信决定将用同层渲染取代 cover-view，它能像普通组件一样使用，原生组件的层级不再是最高，而是和其他的非原生组件在同一层级渲染，可完全由 z-index 控制，可完全支持触摸事件。</p><p>微信表示，同层渲染在 iOS 平台小程序上已经开始内测，会很快开放给开发者，Android 平台已经取得突破性进展，目前正在做一轮封装的工作，开放指日可待。</p><h1 id="wepy-vs-mpvue" tabindex="-1">wepy vs mpvue <a class="header-anchor" href="#wepy-vs-mpvue" aria-label="Permalink to &quot;wepy vs mpvue&quot;">​</a></h1>',19),V=e('<h2 id="数据流管理" tabindex="-1">数据流管理 <a class="header-anchor" href="#数据流管理" aria-label="Permalink to &quot;数据流管理&quot;">​</a></h2><p>相比传统的小程序框架，这个一直是我们作为资深开发者比较期望去解决的，在 Web 开发中，随着 Flux、Redux、Vuex 等多个数据流工具出现，我们也期望在业务复杂的小程序中使用。</p><ul><li><p>WePY 默认支持 Redux，在脚手架生成项目的时候可以内置</p></li><li><p>Mpvue 作为 Vue 的移植版本，当然支持 Vuex，同样在脚手架生成项目的时候可以内置</p></li></ul><h2 id="组件化" tabindex="-1">组件化 <a class="header-anchor" href="#组件化" aria-label="Permalink to &quot;组件化&quot;">​</a></h2><p>如果你和我们一样，经历了从无到有的小程序业务开发，建议阅读【小程序的组件化开发】章节，进行官方语法的组件库开发（从基础库 1.6.3 开始，官方提供了组件化解决方案）。</p><ul><li>WePY 类似 Vue 实现了单文件组件，最大的差别是文件后缀 .wpy，只是写法上会有差异，具体可以查看【主流框架使用案例 1：WePY】章节，学习起来有一定成本，不过也会很快适应：</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default class Index extends wepy.page {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>Mpvue 作为 Vue 的移植版本，支持单文件组件，template、script 和 style 都在一个 .vue 文件中，和 vue 的写法类似，所以对 Vue 开发熟悉的同学会比较适应。</li></ul><h2 id="工程化" tabindex="-1">工程化 <a class="header-anchor" href="#工程化" aria-label="Permalink to &quot;工程化&quot;">​</a></h2><p>所有的小程序开发依赖官方提供的开发者工具。开发者工具简单直观，对调试小程序很有帮助，现在也支持腾讯云（目前我们还没有使用，但是对新的一些开发者还是有帮助的），可以申请测试报告查看小程序在真实的移动设备上运行性能和运行效果，但是它本身没有类似前端工程化中的概念和工具。</p><ul><li><p>wepy 内置了构建，通过 wepy init 命令初始化项目，大致流程如下：</p></li><li><p>wepy-cli 会判断模版是在远程仓库还是在本地，如果在本地则会立即跳到第 3 步，反之继续进行。</p></li><li><p>会从远程仓库下载模版，并保存到本地。</p></li><li><p>询问开发者 Project name 等问题，依据开发者的回答，创建项目。</p></li><li><p>mpvue 沿用了 vue 中推崇的 webpack 作为构建工具，但同时提供了一些自己的插件以及配置文件的一些修改，比如：</p></li><li><p>不再需要 html-webpack-plugin</p></li><li><p>基于 webpack-dev-middleware 修改成 webpack-dev-middleware-hard-disk</p></li><li><p>最大的变化是基于 webpack-loader 修改成 mpvue-loader</p></li><li><p>但是配置方式还是类似，分环境配置文件，最终都会编译成小程序支持的目录结构和文件后缀。</p></li></ul><h2 id="综合比较" tabindex="-1">综合比较 <a class="header-anchor" href="#综合比较" aria-label="Permalink to &quot;综合比较&quot;">​</a></h2><table><thead><tr><th>对比\\框架</th><th>微信小程序</th><th>mpvue</th><th>wepy</th></tr></thead><tbody><tr><td>语法规范</td><td>小程序开发规范</td><td>vue.js</td><td>类vue.js</td></tr><tr><td>标签集合</td><td>小程序</td><td>htm l + 小程序</td><td>小程序</td></tr><tr><td>样式规范</td><td>wxss</td><td>sass,less,postcss</td><td>sass,less,styus</td></tr><tr><td>组件化</td><td>无组件化机制</td><td>vue规范</td><td>自定义组件规范</td></tr><tr><td>多段复用</td><td>不可复用</td><td>支持h5</td><td>支持h5</td></tr><tr><td>自动构建</td><td>无自动构建</td><td>webpack</td><td>框架内置</td></tr><tr><td>上手成本</td><td>全新学习</td><td>vue 学习</td><td>vue 和 wepy</td></tr><tr><td>数据管理</td><td>不支持</td><td>vuex</td><td>redux</td></tr></tbody></table><h2 id="选型的个人看法" tabindex="-1">选型的个人看法 <a class="header-anchor" href="#选型的个人看法" aria-label="Permalink to &quot;选型的个人看法&quot;">​</a></h2><p>先说结论：选择 mpvue。</p><p>wepy vs mpvue。</p><p>理由：</p><p><strong>工程化</strong> 原生开发因为不带工程化，诸如NPM包（未来会引入）、ES7、图片压缩、PostCss、pug、ESLint等等不能用。如果自己要搭工程化，不如直接使用wepy或mpvue。mpvue和wepy都可以和小程序原生开发混写。<a href="about:blank#%3Chttps://github.com/mpvue/examples/tree/master/echarts%3E" title="#&lt;https://github.com/mpvue/examples/tree/master/echarts&gt;" target="_blank" rel="noreferrer">参考mpvue-echart</a>，<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTencent%2Fwepy%2Fissues%2F1560" title="https://github.com/Tencent/wepy/issues/1560" target="_blank" rel="noreferrer">参考wepy</a>。 而问题在于wepy没有引入webpack(wepy@2.0.x依然没有引入)，以上说的这些东西都要造轮子（作者造或自己造）。没有引入 Webpack 是一个重大的硬伤。社区维护的成熟 Webpack 显然更稳定，轮子更多。</p><p><strong>维护</strong> wepy 也是社区维护的，是官方的？其实 wepy 的主要开发者只有作者一人，附上一个<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTencent%2Fwepy%2Fgraphs%2Fcontributors" title="https://github.com/Tencent/wepy/graphs/contributors" target="_blank" rel="noreferrer">contrubutors</a>链接。另外被官方招安了也是后来的事，再说腾讯要有精力帮着一起维护好 wepy，为什么不花精力在小程序原生开发上呢？再来看看 mpvue，是美团一个前端小组维护的。</p><p><strong>学习成本</strong> Vue 的学习曲线比较平缓。mpvue 是 Vue的子集。所以 mpvue 的学习成本会低于 wepy。尤其是之前技术栈有学过用过 Vue 的。</p><p><strong>未来规划</strong> mpvue 已经支持 web 和小程序。因为 mpvue 基于AST，所以未来可以支持支付宝小程序和快应用。他们也是有这样的规划。</p><p>请在需求池下面自己找</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a9cd96a15f056~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt="mpvue-feature"></p><p><strong>坑</strong> 两者都有各自的坑。但是我觉得有一些wepy的坑是没法容忍的。比如<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTencent%2Fwepy%2Fissues%2F1231" title="https://github.com/Tencent/wepy/issues/1231" target="_blank" rel="noreferrer">repeat组建里面用computed得到的列表全是同一套数据</a>而且1.x是没法解决的。 wepy和mpvue我都开发过完整小程序的体验下，我觉得wepy的坑更多，而且wepy有些坑碍于架构设计没办法解决。</p><h1 id="mpvue" tabindex="-1">mpvue <a class="header-anchor" href="#mpvue" aria-label="Permalink to &quot;mpvue&quot;">​</a></h1>',25),E=e(`<blockquote><p>Vue.js 小程序版, fork 自 vuejs/vue@2.4.1，保留了 vue runtime 能力，添加了小程序平台的支持。 <code>mpvue</code> 是一个使用 <code>Vue.js</code> 开发小程序的前端框架。框架基于 <code>Vue.js</code> 核心，<code>mpvue</code> 修改了 <code>Vue.js</code> 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 <code>Vue.js</code> 开发体验。</p></blockquote><h2 id="框架原理" tabindex="-1">框架原理 <a class="header-anchor" href="#框架原理" aria-label="Permalink to &quot;框架原理&quot;">​</a></h2><p><strong>两个大方向</strong></p><ul><li>通过<code>mpvue</code>提供 mp 的 runtime 适配小程序</li><li>通过<code>mpvue-loader</code>产出微信小程序所需要的文件结构和模块内容。</li></ul><p><strong>七个具体问题</strong></p><p>要了解 mpvue 原理必然要了解 Vue 原理，这是大前提。但是要讲清楚 Vue 原理需要花费大量的篇幅，不如参考<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanswershuto%2FlearnVue" title="https://github.com/answershuto/learnVue" target="_blank" rel="noreferrer">learnVue</a>。</p><p>现在假设您对 Vue 原理有个大概的了解。</p><p>由于 Vue 使用了 Virtual DOM，所以 Virtual DOM 可以在任何支持 JavaScript 语言的平台上操作，譬如说目前 Vue 支持浏览器平台或 weex，也可以是 mp(小程序)。那么最后 Virtual DOM 如何映射到真实的 DOM 节点上呢？vue为平台做了一层适配层，浏览器平台见 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fweb%2Fruntime%2Fnode-ops.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/web/runtime/node-ops.js" target="_blank" rel="noreferrer">runtime/node-ops.js</a>、weex平台见<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fweex%2Fruntime%2Fnode-ops.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/weex/runtime/node-ops.js" target="_blank" rel="noreferrer">runtime/node-ops.js</a>，小程序见<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fruntime%2Fnode-ops.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/node-ops.js" target="_blank" rel="noreferrer">runtime/node-ops.js</a>。不同平台之间通过适配层对外提供相同的接口，Virtual DOM进行操作Real DOM节点的时候，只需要调用这些适配层的接口即可，而内部实现则不需要关心，它会根据平台的改变而改变。</p><p>所以思路肯定是往增加一个 mp 平台的 runtime 方向走。但问题是小程序不能操作 DOM，所以 mp 下的<code>node-ops.js</code> 里面的实现都是直接 <code>return obj</code>。</p><p>新 Virtual DOM 和旧 Virtual DOM 之间需要做一个 patch，找出 diff。patch完了之后的 diff 怎么更新视图，也就是如何给这些 DOM 加入 attr、class、style 等 DOM 属性呢？ Vue 中有 nextTick 的概念用以更新视图，mpvue这块对于小程序的 <code>setData</code> 应该怎么处理呢？</p><p>另外个问题在于小程序的 Virtual DOM 怎么生成？也就是怎么将 template 编译成<code>render function</code>。这当中还涉及到<a href="https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Finstallation.html%23%25E8%25BF%2590%25E8%25A1%258C%25E6%2597%25B6-%25E7%25BC%2596%25E8%25AF%2591%25E5%2599%25A8-vs-%25E5%258F%25AA%25E5%258C%2585%25E5%2590%25AB%25E8%25BF%2590%25E8%25A1%258C%25E6%2597%25B6" title="https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6" target="_blank" rel="noreferrer">运行时-编译器-vs-只包含运行时</a>，显然如果要提高性能、减少包大小、输出 wxml、mpvue 也要提供预编译的能力。因为要预输出 wxml 且没法动态改变 DOM，所以动态组件，自定义 render，和<code>&lt;script type=&quot;text/x-template&quot;&gt;</code> 字符串模版等都不支持(<a href="https://link.juejin.cn/?target=http%3A%2F%2Fmpvue.com%2Fmpvue%2F%23_15" title="http://mpvue.com/mpvue/#_15" target="_blank" rel="noreferrer">参考</a>)。</p><p>另外还有一些其他问题，最后总结一下</p><ul><li>1.如何预编译生成<code>render function</code></li><li>2.如何预编译生成 wxml，wxss，wxs</li><li>3.如何 patch 出 diff</li><li>4.如何更新视图</li><li>5.如何建立小程序事件代理机制，在事件代理函数中触发与之对应的vue组件事件响应</li><li>6.如何建立vue实例与小程序 Page 实例关联</li><li>7.如何建立小程序和vue生命周期映射关系，能在小程序生命周期中触发vue生命周期</li></ul><p><strong><a href="https://link.juejin.cn/?target=" target="_blank" rel="noreferrer">platform/mp的目录结构</a></strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── compiler //解决问题1，mpvue-template-compiler源码部分</span></span>
<span class="line"><span>├── runtime //解决问题3 4 5 6 7</span></span>
<span class="line"><span>├── util //工具方法</span></span>
<span class="line"><span>├── entry-compiler.js //mpvue-template-compiler的入口。package.json相关命令会自动生成mpvue-template-compiler这个package。</span></span>
<span class="line"><span>├── entry-runtime.js //对外提供Vue对象，当然是mpvue</span></span>
<span class="line"><span>└── join-code-in-build.js //编译出SDK时的修复</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>后面的内容逐步解答这几个问题，也就弄明白了原理</strong></p><h3 id="mpvue-loader" tabindex="-1">mpvue-loader <a class="header-anchor" href="#mpvue-loader" aria-label="Permalink to &quot;mpvue-loader&quot;">​</a></h3><p><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmpvue%2Fmpvue-loader" title="https://github.com/mpvue/mpvue-loader" target="_blank" rel="noreferrer">mpvue-loader</a> 是 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-loader" title="https://github.com/vuejs/vue-loader" target="_blank" rel="noreferrer">vue-loader</a> 的一个扩展延伸版，类似于超集的关系，除了<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-loader" title="https://github.com/vuejs/vue-loader" target="_blank" rel="noreferrer">vue-loader</a> 本身所具备的能力之外，它还会利用<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Ftree%2Fmaster%2Fpackages%2Fmpvue-template-compiler" title="https://github.com/Meituan-Dianping/mpvue/tree/master/packages/mpvue-template-compiler" target="_blank" rel="noreferrer">mpvue-template-compiler</a>生成<code>render function</code>。</p><ul><li>entry</li></ul><p>它会从 <code>webpack</code> 的配置中的 entry 开始，分析依赖模块，并分别打包。在entry 中 app 属性及其内容会被打包为微信小程序所需要的 app.js／app.json／app.wxss，其余的会生成对应的页面page.js/page.json/page.wxml/page.wxss，如示例的 entry 将会生成如下这些文件，文件内容下文慢慢讲来：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// webpack.config.js</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>    entry: {</span></span>
<span class="line"><span>        app: resolve(&#39;./src/main.js&#39;),               // app 字段被识别为 app 类型</span></span>
<span class="line"><span>        index: resolve(&#39;./src/pages/index/main.js&#39;),   // 其余字段被识别为 page 类型</span></span>
<span class="line"><span>        &#39;news/home&#39;: resolve(&#39;./src/pages/news/home/index.js&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 产出文件的结构</span></span>
<span class="line"><span>.</span></span>
<span class="line"><span>├── app.js</span></span>
<span class="line"><span>├── app.json</span></span>
<span class="line"><span>├──· app.wxss</span></span>
<span class="line"><span>├── components</span></span>
<span class="line"><span>│   ├── card$74bfae61.wxml</span></span>
<span class="line"><span>│   ├── index$023eef02.wxml</span></span>
<span class="line"><span>│   └── news$0699930b.wxml</span></span>
<span class="line"><span>├── news</span></span>
<span class="line"><span>│   ├── home.js</span></span>
<span class="line"><span>│   ├── home.wxml</span></span>
<span class="line"><span>│   └── home.wxss</span></span>
<span class="line"><span>├── pages</span></span>
<span class="line"><span>│   └── index</span></span>
<span class="line"><span>│       ├── index.js</span></span>
<span class="line"><span>│       ├── index.wxml</span></span>
<span class="line"><span>│       └── index.wxss</span></span>
<span class="line"><span>└── static</span></span>
<span class="line"><span>    ├── css</span></span>
<span class="line"><span>    │   ├── app.wxss</span></span>
<span class="line"><span>    │   ├── index.wxss</span></span>
<span class="line"><span>    │   └── news</span></span>
<span class="line"><span>    │       └── home.wxss</span></span>
<span class="line"><span>    └── js</span></span>
<span class="line"><span>        ├── app.js</span></span>
<span class="line"><span>        ├── index.js</span></span>
<span class="line"><span>        ├── manifest.js</span></span>
<span class="line"><span>        ├── news</span></span>
<span class="line"><span>        │   └── home.js</span></span>
<span class="line"><span>        └── vendor.js</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><ul><li>wxml 每一个 <code>.vue</code> 的组件都会被生成为一个 wxml 规范的 template，然后通过 wxml 规范的 import 语法来达到一个复用，同时组件如果涉及到 props 的 data 数据，我们也会做相应的处理，举个实际的例子：</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;my-component&quot; @click=&quot;test&quot;&gt;</span></span>
<span class="line"><span>        &lt;h1&gt;{{msg}}&lt;/h1&gt;</span></span>
<span class="line"><span>        &lt;other-component :msg=&quot;msg&quot;&gt;&lt;/other-component&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>import otherComponent from &#39;./otherComponent.vue&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  components: { otherComponent },</span></span>
<span class="line"><span>  data () {</span></span>
<span class="line"><span>    return { msg: &#39;Hello Vue.js!&#39; }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    test() {}</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>这样一个 Vue 的组件的模版部分会生成相应的 wxml</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;import src=&quot;components/other-component$hash.wxml&quot; /&gt;</span></span>
<span class="line"><span>&lt;template name=&quot;component$hash&quot;&gt;</span></span>
<span class="line"><span>    &lt;view class=&quot;my-component&quot; bindtap=&quot;handleProxy&quot;&gt;</span></span>
<span class="line"><span>        &lt;view class=&quot;_h1&quot;&gt;{{msg}}&lt;/view&gt;</span></span>
<span class="line"><span>        &lt;template is=&quot;other-component$hash&quot; wx:if=&quot;{{ $c[0] }}&quot; data=&quot;{{ ...$c[0] }}&quot;&gt;&lt;/template&gt;</span></span>
<span class="line"><span>    &lt;/view&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可能已经注意到了 other-component(:msg=&quot;msg&quot;) 被转化成了 。mpvue 在运行时会从根组件开始把所有的组件实例数据合并成一个树形的数据，然后通过 setData 到 appData,<code>$c</code>是 $children 的缩写。至于那个 0 则是我们的 compiler 处理过后的一个标记，会为每一个子组件打一个特定的不重复的标记。 树形数据结构如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 这儿数据结构是一个数组，index 是动态的</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  $child: {</span></span>
<span class="line"><span>    &#39;0&#39;{</span></span>
<span class="line"><span>      // ... root data</span></span>
<span class="line"><span>      $child: {</span></span>
<span class="line"><span>        &#39;0&#39;: {</span></span>
<span class="line"><span>          // ... data</span></span>
<span class="line"><span>          msg: &#39;Hello Vue.js!&#39;,</span></span>
<span class="line"><span>          $child: {</span></span>
<span class="line"><span>            // ...data</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><ul><li>wxss</li></ul><p>这个部分的处理同 web 的处理差异不大，唯一不同在于通过配置生成 .css 为 .wxss ，其中的对于 css 的若干处理，在 postcss-mpvue-wxss 和 px2rpx-loader 这两部分的文档中又详细的介绍。</p><p>app.json／page.json 1.1.1 以上</p><p>推荐和小程序一样，将 app.json／page.json 放到页面入口处，使用 copy-webpack-plugin copy 到对应的生成位置。</p><p>1.1.1 以下</p><p>这部分内容来源于 app 和 page 的 entry 文件，通常习惯是 main.js，你需要在你的入口文件中 export default { config: {} }，这才能被我们的 loader 识别为这是一个配置，需要写成 json 文件。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import Vue from &#39;vue&#39;;</span></span>
<span class="line"><span>import App from &#39;./app&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const vueApp = new Vue(App);</span></span>
<span class="line"><span>vueApp.$mount();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这个是我们约定的额外的配置</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>    // 这个字段下的数据会被填充到 app.json ／ page.json</span></span>
<span class="line"><span>    config: {</span></span>
<span class="line"><span>        pages: [&#39;static/calendar/calendar&#39;, &#39;^pages/list/list&#39;], // Will be filled in webpack</span></span>
<span class="line"><span>        window: {</span></span>
<span class="line"><span>            backgroundTextStyle: &#39;light&#39;,</span></span>
<span class="line"><span>            navigationBarBackgroundColor: &#39;#455A73&#39;,</span></span>
<span class="line"><span>            navigationBarTitleText: &#39;美团汽车票&#39;,</span></span>
<span class="line"><span>            navigationBarTextStyle: &#39;#fff&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>同时，这个时候，我们会根据 entry 的页面数据，自动填充到 app.json 中的 pages 字段。 pages 字段也是可以自定义的，约定带有 ^ 符号开头的页面，会放到数组的最前面。</p><p>style scoped 在 vue-loader 中对 style scoped 的处理方式是给每个样式加一个 attr 来标记 module-id，然后在 css 中也给每条 rule 后添加 [module-id]，最终可以形成一个 css 的“作用域空间”。</p><p>在微信小程序中目前是不支持 attr 选择器的，所以我们做了一点改动，把 attr 上的 [module-id] 直接写到了 class 里，如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!-- .vue --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;style scoped&gt;</span></span>
<span class="line"><span>    .container {</span></span>
<span class="line"><span>        color: red;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- vue-loader --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;container&quot; data-v-23e58823&gt;</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;style scoped&gt;</span></span>
<span class="line"><span>    .container[data-v-23e58823] {</span></span>
<span class="line"><span>        color: red;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- mpvue-loader --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;container data-v-23e58823&quot;&gt;</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span>&lt;style scoped&gt;</span></span>
<span class="line"><span>    .container.data-v-23e58823 {</span></span>
<span class="line"><span>        color: red;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><ul><li>compiler</li></ul><p>生产出的内容是：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(function(module, __webpack_exports__, __webpack_require__) {</span></span>
<span class="line"><span>&quot;use strict&quot;;</span></span>
<span class="line"><span>// mpvue-template-compiler会利用AST预编译生成一个render function用以生成Virtual DOM。</span></span>
<span class="line"><span>var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;</span></span>
<span class="line"><span>  // _c创建虚拟节点，参考https://github.com/Meituan-Dianping/mpvue/blob/master/packages/mpvue/index.js#L3606</span></span>
<span class="line"><span>  // 以及https://github.com/Meituan-Dianping/mpvue/blob/master/packages/mpvue/index.js#L3680</span></span>
<span class="line"><span>  return _c(&#39;div&#39;, {</span></span>
<span class="line"><span>    staticClass: &quot;my-component&quot;</span></span>
<span class="line"><span>  }, [_c(&#39;h1&#39;, [_vm._v(_vm._s(_vm.msg))]), _vm._v(&quot; &quot;), _c(&#39;other-component&#39;, {</span></span>
<span class="line"><span>    attrs: {</span></span>
<span class="line"><span>      &quot;msg&quot;: _vm.msg,</span></span>
<span class="line"><span>      &quot;mpcomid&quot;: &#39;0&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })], 1)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// staticRenderFns的作用是静态渲染，在更新时不会进行patch，优化性能。而staticRenderFns是个空数组。</span></span>
<span class="line"><span>var staticRenderFns = []</span></span>
<span class="line"><span>render._withStripped = true</span></span>
<span class="line"><span>var esExports = { render: render, staticRenderFns: staticRenderFns }</span></span>
<span class="line"><span>/* harmony default export */ __webpack_exports__[&quot;a&quot;] = (esExports);</span></span>
<span class="line"><span>if (false) {</span></span>
<span class="line"><span>  module.hot.accept()</span></span>
<span class="line"><span>  if (module.hot.data) {</span></span>
<span class="line"><span>     require(&quot;vue-hot-reload-api&quot;).rerender(&quot;data-v-54ad9125&quot;, esExports)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/***/ })</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h3 id="compiler" tabindex="-1">compiler <a class="header-anchor" href="#compiler" aria-label="Permalink to &quot;compiler&quot;">​</a></h3><p>compiler相关，也就是template预编译这块，可以参考《<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanswershuto%2FlearnVue%2Fblob%2Fmaster%2Fdocs%2F%25E8%2581%258A%25E8%2581%258AVue%25E7%259A%2584template%25E7%25BC%2596%25E8%25AF%2591.MarkDown%23createcompiler" title="https://github.com/answershuto/learnVue/blob/master/docs/%E8%81%8A%E8%81%8AVue%E7%9A%84template%E7%BC%96%E8%AF%91.MarkDown#createcompiler" target="_blank" rel="noreferrer">聊聊Vue的template编译</a>》来搞明白。原理是一样的。</p><p>mpvue自己实现了<code>export { compile, compileToFunctions, compileToWxml }</code>(<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fcompiler%2Findex.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/compiler/index.js" target="_blank" rel="noreferrer">链接</a>)其中<code>compileToWxml</code>是用来生成wxml，具体代码<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmpvue%2Fmpvue-loader%2Fblob%2Fmaster%2Flib%2Fmp-compiler%2Findex.js%23L30" title="https://github.com/mpvue/mpvue-loader/blob/master/lib/mp-compiler/index.js#L30" target="_blank" rel="noreferrer">在这</a>。</p><p>另外mpvue是不需要提供<a href="https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Finstallation.html%23%25E8%25BF%2590%25E8%25A1%258C%25E6%2597%25B6-%25E7%25BC%2596%25E8%25AF%2591%25E5%2599%25A8-vs-%25E5%258F%25AA%25E5%258C%2585%25E5%2590%25AB%25E8%25BF%2590%25E8%25A1%258C%25E6%2597%25B6" title="https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6" target="_blank" rel="noreferrer">运行时-编译器</a>的，虽然理论上是能够做到的。因为小程序不能操作DOM，即便提供了运行时-编译器也产生不了界面。</p><p>详细讲解compile过程：</p><p>1.将vue文件解析成模板对象</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// mpvue-loader/lib/loader.js</span></span>
<span class="line"><span>var parts = parse(content, fileName, this.sourceMap)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>假如vue文件源码如下:</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;view class=&quot;container-bg&quot;&gt;</span></span>
<span class="line"><span>    &lt;view class=&quot;home-container&quot;&gt;</span></span>
<span class="line"><span>      &lt;home-quotation-view v-for=&quot;(item, index) in lists&quot; :key=&quot;index&quot; :reason=&quot;item.reason&quot; :stockList=&quot;item.list&quot; @itemViewClicked=&quot;itemViewClicked&quot; /&gt;</span></span>
<span class="line"><span>    &lt;/view&gt;</span></span>
<span class="line"><span>  &lt;/view&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&quot;js&quot;&gt;</span></span>
<span class="line"><span>import homeQuotationView from &#39;@/components/homeQuotationView&#39;</span></span>
<span class="line"><span>import topListApi from &#39;@/api/topListApi&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  data () {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      lists: []</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  components: {</span></span>
<span class="line"><span>    homeQuotationView</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    async loadRankList () {</span></span>
<span class="line"><span>      let {data} = await topListApi.rankList()</span></span>
<span class="line"><span>      if (data) {</span></span>
<span class="line"><span>        this.dateTime = data.dt</span></span>
<span class="line"><span>        this.lists = data.rankList.filter((item) =&gt; {</span></span>
<span class="line"><span>          return !!item</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    itemViewClicked (quotationItem) {</span></span>
<span class="line"><span>      wx.navigateTo({</span></span>
<span class="line"><span>        url: \`/pages/topListDetail/main?item=\${JSON.stringify(quotationItem)}\`</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  onShow () {</span></span>
<span class="line"><span>    this.loadRankList()</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style lang=&quot;stylus&quot; scoped&gt;</span></span>
<span class="line"><span>  .container-bg</span></span>
<span class="line"><span>    width 100%</span></span>
<span class="line"><span>    height 100%</span></span>
<span class="line"><span>    background-color #F2F4FA</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  .home-container</span></span>
<span class="line"><span>    width 100%</span></span>
<span class="line"><span>    height 100%</span></span>
<span class="line"><span>    overflow-x hidden</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div><p>调用<code>parse(content, fileName, this.sourceMap)</code> 函数得到的结果大致如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  template: {</span></span>
<span class="line"><span>    type: &#39;template&#39;,</span></span>
<span class="line"><span>    content: &#39;\\n&lt;view class=&quot;container-bg&quot;&gt;\\n  &lt;view class=&quot;home-container&quot;&gt;\\n    &lt;home-quotation-view v-for=&quot;(item, index) in lists&quot; :key=&quot;index&quot; :reason=&quot;item.reason&quot; :stockList=&quot;item.list&quot; @itemViewClicked=&quot;itemViewClicked&quot; /&gt;\\n  &lt;/view&gt;\\n&lt;/view&gt;\\n&#39;,</span></span>
<span class="line"><span>    start: 10,</span></span>
<span class="line"><span>    attrs: {},</span></span>
<span class="line"><span>    end: 251</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  script: {</span></span>
<span class="line"><span>    type: &#39;script&#39;,</span></span>
<span class="line"><span>    content: &#39;\\n\\n\\n\\n\\n\\n\\n\\n\\nimport homeQuotationView from \\&#39;@/components/homeQuotationView\\&#39;\\nimport topListApi from \\&#39;@/api/topListApi\\&#39;\\n\\nexport default {\\n  data () {\\n    return {\\n      lists: []\\n    }\\n  },\\n  components: {\\n    homeQuotationView\\n  },\\n  methods: {\\n    async loadRankList () {\\n      let {data} = await topListApi.rankList()\\n      if (data) {\\n        this.dateTime = data.dt\\n        this.lists = data.rankList.filter((item) =&gt; {\\n          return !!item\\n        })\\n      }\\n    },\\n    itemViewClicked (quotationItem) {\\n      wx.navigateTo({\\n        url: \`/pages/topListDetail/main?item=\${JSON.stringify(quotationItem)}\`\\n      })\\n    }\\n  },\\n  onShow () {\\n    this.loadRankList()\\n  }\\n}\\n&#39;,</span></span>
<span class="line"><span>    start: 282,</span></span>
<span class="line"><span>    attrs: {</span></span>
<span class="line"><span>      lang: &#39;js&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    lang: &#39;js&#39;,</span></span>
<span class="line"><span>    end: 946,</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  styles: [{</span></span>
<span class="line"><span>    type: &#39;style&#39;,</span></span>
<span class="line"><span>    content: &#39;\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n.container-bg\\n  width 100%\\n  height 100%\\n  background-color #F2F4FA\\n\\n.home-container\\n  width 100%\\n  height 100%\\n  overflow-x hidden\\n\\n&#39;,</span></span>
<span class="line"><span>    start: 985,</span></span>
<span class="line"><span>    attrs: [Object],</span></span>
<span class="line"><span>    lang: &#39;stylus&#39;,</span></span>
<span class="line"><span>    scoped: true,</span></span>
<span class="line"><span>    end: 1135,</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>  }],</span></span>
<span class="line"><span>  customBlocks: []</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>2.调用mpvue-loader/lib/template-compiler/index.js导出的接口并传入上面得到的html模板：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var templateCompilerPath = normalize.lib(&#39;template-compiler/index&#39;)</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>var defaultLoaders = {</span></span>
<span class="line"><span>  html: templateCompilerPath + templateCompilerOptions,</span></span>
<span class="line"><span>  css: options.extractCSS</span></span>
<span class="line"><span>    ? getCSSExtractLoader()</span></span>
<span class="line"><span>    : styleLoaderPath + &#39;!&#39; + &#39;css-loader&#39; + cssLoaderOptions,</span></span>
<span class="line"><span>  js: hasBuble ? (&#39;buble-loader&#39; + bubleOptions) : hasBabel ? babelLoaderOptions : &#39;&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// check if there are custom loaders specified via</span></span>
<span class="line"><span>// webpack config, otherwise use defaults</span></span>
<span class="line"><span>var loaders = Object.assign({}, defaultLoaders, options.loaders)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ol start="3"><li>调用mpvue/packages/mpvue-template-compiler/build.js的compile接口：</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// mpvue-loader/lib/template-compiler/index.js</span></span>
<span class="line"><span>var compiled = compile(html, compilerOptions)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>compile方法生产下面的ast(Abstract Syntax Tree)模板，render函数和staticRenderFns</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  ast: {</span></span>
<span class="line"><span>    type: 1,</span></span>
<span class="line"><span>    tag: &#39;view&#39;,</span></span>
<span class="line"><span>    attrsList: [],</span></span>
<span class="line"><span>    attrsMap: {</span></span>
<span class="line"><span>      class: &#39;container-bg&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    parent: undefined,</span></span>
<span class="line"><span>    children: [{</span></span>
<span class="line"><span>      type: 1,</span></span>
<span class="line"><span>      tag: &#39;view&#39;,</span></span>
<span class="line"><span>      attrsList: [],</span></span>
<span class="line"><span>      attrsMap: {</span></span>
<span class="line"><span>        class: &#39;home-container&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      parent: {</span></span>
<span class="line"><span>        type: 1,</span></span>
<span class="line"><span>        tag: &#39;view&#39;,</span></span>
<span class="line"><span>        attrsList: [],</span></span>
<span class="line"><span>        attrsMap: {</span></span>
<span class="line"><span>          class: &#39;container-bg&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        parent: undefined,</span></span>
<span class="line"><span>        children: [</span></span>
<span class="line"><span>          [Circular]</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        plain: false,</span></span>
<span class="line"><span>        staticClass: &#39;&quot;container-bg&quot;&#39;,</span></span>
<span class="line"><span>        static: false,</span></span>
<span class="line"><span>        staticRoot: false</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      children: [{</span></span>
<span class="line"><span>        type: 1,</span></span>
<span class="line"><span>        tag: &#39;home-quotation-view&#39;,</span></span>
<span class="line"><span>        attrsList: [{</span></span>
<span class="line"><span>          name: &#39;:reason&#39;,</span></span>
<span class="line"><span>          value: &#39;item.reason&#39;</span></span>
<span class="line"><span>        }, {</span></span>
<span class="line"><span>          name: &#39;:stockList&#39;,</span></span>
<span class="line"><span>          value: &#39;item.list&#39;</span></span>
<span class="line"><span>        }, {</span></span>
<span class="line"><span>          name: &#39;@itemViewClicked&#39;,</span></span>
<span class="line"><span>          value: &#39;itemViewClicked&#39;</span></span>
<span class="line"><span>        }],</span></span>
<span class="line"><span>        attrsMap: {</span></span>
<span class="line"><span>          &#39;v-for&#39;: &#39;(item, index) in lists&#39;,</span></span>
<span class="line"><span>          &#39;:key&#39;: &#39;index&#39;,</span></span>
<span class="line"><span>          &#39;:reason&#39;: &#39;item.reason&#39;,</span></span>
<span class="line"><span>          &#39;:stockList&#39;: &#39;item.list&#39;,</span></span>
<span class="line"><span>          &#39;@itemViewClicked&#39;: &#39;itemViewClicked&#39;,</span></span>
<span class="line"><span>          &#39;data-eventid&#39;: &#39;{{\\&#39;0-\\&#39;+index}}&#39;,</span></span>
<span class="line"><span>          &#39;data-comkey&#39;: &#39;{{$k}}&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        parent: [Circular],</span></span>
<span class="line"><span>        children: [],</span></span>
<span class="line"><span>        for: &#39;lists&#39;,</span></span>
<span class="line"><span>        alias: &#39;item&#39;,</span></span>
<span class="line"><span>        iterator1: &#39;index&#39;,</span></span>
<span class="line"><span>        key: &#39;index&#39;,</span></span>
<span class="line"><span>        plain: false,</span></span>
<span class="line"><span>        hasBindings: true,</span></span>
<span class="line"><span>        attrs: [{</span></span>
<span class="line"><span>          name: &#39;reason&#39;,</span></span>
<span class="line"><span>          value: &#39;item.reason&#39;</span></span>
<span class="line"><span>        }, {</span></span>
<span class="line"><span>          name: &#39;stockList&#39;,</span></span>
<span class="line"><span>          value: &#39;item.list&#39;</span></span>
<span class="line"><span>        }, {</span></span>
<span class="line"><span>          name: &#39;eventid&#39;,</span></span>
<span class="line"><span>          value: &#39;\\&#39;0-\\&#39;+index&#39;</span></span>
<span class="line"><span>        }, {</span></span>
<span class="line"><span>          name: &#39;mpcomid&#39;,</span></span>
<span class="line"><span>          value: &#39;\\&#39;0-\\&#39;+index&#39;</span></span>
<span class="line"><span>        }],</span></span>
<span class="line"><span>        events: {</span></span>
<span class="line"><span>          itemViewClicked: {</span></span>
<span class="line"><span>            value: &#39;itemViewClicked&#39;,</span></span>
<span class="line"><span>            modifiers: undefined</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        eventid: &#39;\\&#39;0-\\&#39;+index&#39;,</span></span>
<span class="line"><span>        mpcomid: &#39;\\&#39;0-\\&#39;+index&#39;,</span></span>
<span class="line"><span>        static: false,</span></span>
<span class="line"><span>        staticRoot: false,</span></span>
<span class="line"><span>        forProcessed: true</span></span>
<span class="line"><span>      }],</span></span>
<span class="line"><span>      plain: false,</span></span>
<span class="line"><span>      staticClass: &#39;&quot;home-container&quot;&#39;,</span></span>
<span class="line"><span>      static: false,</span></span>
<span class="line"><span>      staticRoot: false</span></span>
<span class="line"><span>    }],</span></span>
<span class="line"><span>    plain: false,</span></span>
<span class="line"><span>    staticClass: &#39;&quot;container-bg&quot;&#39;,</span></span>
<span class="line"><span>    static: false,</span></span>
<span class="line"><span>    staticRoot: false</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  render: &#39;with(this){return _c(\\&#39;view\\&#39;,{staticClass:&quot;container-bg&quot;},[_c(\\&#39;view\\&#39;,{staticClass:&quot;home-container&quot;},_l((lists),function(item,index){return _c(\\&#39;home-quotation-view\\&#39;,{key:index,attrs:{&quot;reason&quot;:item.reason,&quot;stockList&quot;:item.list,&quot;eventid&quot;:\\&#39;0-\\&#39;+index,&quot;mpcomid&quot;:\\&#39;0-\\&#39;+index},on:{&quot;itemViewClicked&quot;:itemViewClicked}})}))])}&#39;,</span></span>
<span class="line"><span>  staticRenderFns: [],</span></span>
<span class="line"><span>  errors: [],</span></span>
<span class="line"><span>  tips: []</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br></div></div><p>其中的render函数运行的结果是返回<code>VNode</code>对象，其实<code>render</code>函数应该长下面这样：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(function() {</span></span>
<span class="line"><span>  with(this){</span></span>
<span class="line"><span>    return _c(&#39;div&#39;,{   //创建一个 div 元素</span></span>
<span class="line"><span>      attrs:{&quot;id&quot;:&quot;app&quot;}  //div 添加属性 id</span></span>
<span class="line"><span>      },[</span></span>
<span class="line"><span>        _m(0),  //静态节点 header，此处对应 staticRenderFns 数组索引为 0 的 render 函数</span></span>
<span class="line"><span>        _v(&quot; &quot;), //空的文本节点</span></span>
<span class="line"><span>        (message) //三元表达式，判断 message 是否存在</span></span>
<span class="line"><span>         //如果存在，创建 p 元素，元素里面有文本，值为 toString(message)</span></span>
<span class="line"><span>        ?_c(&#39;p&#39;,[_v(&quot;\\n    &quot;+_s(message)+&quot;\\n  &quot;)])</span></span>
<span class="line"><span>        //如果不存在，创建 p 元素，元素里面有文本，值为 No message. </span></span>
<span class="line"><span>        :_c(&#39;p&#39;,[_v(&quot;\\n    No message.\\n  &quot;)])</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>其中的<code>_c</code>就是vue对象的<code>createElement</code>方法 (创建元素)，<code>_m</code>是<code>renderStatic</code>（渲染静态节点），<code>_v</code> 是 <code>createTextVNode</code>（创建文本dom），<code>_s</code> 是 <code>toString</code> （转换为字符串）</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// src/core/instance/render.js</span></span>
<span class="line"><span>export function initRender (vm: Component) {</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  // bind the createElement fn to this instance</span></span>
<span class="line"><span>  // so that we get proper render context inside it.</span></span>
<span class="line"><span>  // args order: tag, data, children, normalizationType, alwaysNormalize</span></span>
<span class="line"><span>  // internal version is used by render functions compiled from templates</span></span>
<span class="line"><span>  vm._c = (a, b, c, d) =&gt; createElement(vm, a, b, c, d, false)</span></span>
<span class="line"><span>  // normalization is always applied for the public version, used in</span></span>
<span class="line"><span>  // user-written render functions.</span></span>
<span class="line"><span>  vm.$createElement = (a, b, c, d) =&gt; createElement(vm, a, b, c, d, true)</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Vue.prototype._s = toString</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Vue.prototype._m = renderStatic</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Vue.prototype._v = createTextVNode</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><ol start="4"><li>调用compileWxml方法生产wxml模板，这个方法最终会调用 mpvue/packages/mpvue-template-compiler/build.js的compileToWxml方法将第一步compile出来的模板转成小程序的wxml模板</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// mpvue-loader/lib/template-compiler/index.js</span></span>
<span class="line"><span>compileToWxml.call(this, compiled, html)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>以上解答了问题1、2</strong></p><h3 id="runtime" tabindex="-1">runtime <a class="header-anchor" href="#runtime" aria-label="Permalink to &quot;runtime&quot;">​</a></h3><p><a href="https://link.juejin.cn/?target=" target="_blank" rel="noreferrer">目录结构</a></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── events.js //解答问题5</span></span>
<span class="line"><span>├── index.js //入口提供Vue对象，以及$mount，和各种初始化</span></span>
<span class="line"><span>├── liefcycle //解答问题6、7</span></span>
<span class="line"><span>├── node-ops.js //操作真实DOM的相关实现，因为小程序不能操作DOM，所以这里都是直接返回</span></span>
<span class="line"><span>├── patch.js //解答问题3</span></span>
<span class="line"><span>└── render.js //解答问题4</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fruntime%2Fpatch.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/patch.js" target="_blank" rel="noreferrer">patch.js</a></strong></p><p>和vue使用的<code>createPatchFunction</code>保持一致，任然是旧树和新树进行patch产出diff，但是多了一行this.$updateDataToMP()用以更新。</p><p><strong><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fruntime%2Frender.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/render.js" target="_blank" rel="noreferrer">render.js</a></strong></p><p>两个核心的方法<code>initDataToMP</code>、<code>updateDataToMP</code>。</p><p><code>initDataToMP</code>收集vm上的data，然后调用小程序Page示例的<code>setData</code>渲染。</p><p><code>updateDataToMP</code>在每次patch，也就是依赖收集发现数据改变时更新(参考patch.js代码)，这部分一样会使用<code>nextTick</code>和队列。最终使用了节流阀<code>throttleSetData</code>。50毫秒用来控制频率以解决频繁修改Data，会造成大量传输Data数据而导致的性能问题。</p><p>其中<code>collectVmData</code>最终也是用到了<code>formatVmData</code>。尤其要注意的是一句注释：</p><blockquote><p>getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据</p></blockquote><p>我们又知道，service到view是两个线程间通信，如果Data含有大量数据，增加了传输数据量，加大了传输成本，将会造成性能下降。</p><p><strong><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fruntime%2Fevents.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/events.js" target="_blank" rel="noreferrer">events.js</a></strong></p><p>正如官网所说的，这里使用<code>eventTypeMap</code>做了各<a href="https://link.juejin.cn/?target=http%3A%2F%2Fmpvue.com%2Fmpvue%2F%23_13" title="http://mpvue.com/mpvue/#_13" target="_blank" rel="noreferrer">事件的隐射</a></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { getComKey, eventTypeMap } from &#39;../util/index&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 用于小程序的 event type 到 web 的 event</span></span>
<span class="line"><span>export const eventTypeMap = {</span></span>
<span class="line"><span>  tap: [&#39;tap&#39;, &#39;click&#39;],</span></span>
<span class="line"><span>  touchstart: [&#39;touchstart&#39;],</span></span>
<span class="line"><span>  touchmove: [&#39;touchmove&#39;],</span></span>
<span class="line"><span>  touchcancel: [&#39;touchcancel&#39;],</span></span>
<span class="line"><span>  touchend: [&#39;touchend&#39;],</span></span>
<span class="line"><span>  longtap: [&#39;longtap&#39;],</span></span>
<span class="line"><span>  input: [&#39;input&#39;],</span></span>
<span class="line"><span>  blur: [&#39;change&#39;, &#39;blur&#39;],</span></span>
<span class="line"><span>  submit: [&#39;submit&#39;],</span></span>
<span class="line"><span>  focus: [&#39;focus&#39;],</span></span>
<span class="line"><span>  scrolltoupper: [&#39;scrolltoupper&#39;],</span></span>
<span class="line"><span>  scrolltolower: [&#39;scrolltolower&#39;],</span></span>
<span class="line"><span>  scroll: [&#39;scroll&#39;]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>使用了<code>handleProxyWithVue</code>方法来代理小程序事件到vue事件。</p><p>另外看下作者自己对这部分的<a href="https://link.juejin.cn/?target=https%3A%2F%2Ftech.meituan.com%2Fmt_mpvue_development_framework.html" title="https://tech.meituan.com/mt_mpvue_development_framework.html" target="_blank" rel="noreferrer">思路</a></p><blockquote><p><strong>事件代理机制</strong>：用户交互触发的数据更新通过事件代理机制完成。在 Vue.js 代码中，事件响应函数对应到组件的 method， Vue.js 自动维护了上下文环境。然而在小程序中并没有类似的机制，又因为 Vue.js 执行环境中维护着一份实时的虚拟 DOM，这与小程序的视图层完全对应，我们思考，在小程序组件节点上触发事件后，只要找到虚拟 DOM 上对应的节点，触发对应的事件不就完成了么；另一方面，Vue.js 事件响应如果触发了数据更新，其生命周期函数更新将自动触发，在此函数上同步更新小程序数据，数据同步也就实现了。</p></blockquote><p><code>getHandle</code>这个方法应该就是作者思路当中所说的：找到对应节点，然后找到handle。</p><p><strong><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fruntime%2Flifecycle.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/lifecycle.js" target="_blank" rel="noreferrer">lifecycle.js</a></strong></p><p>在<code>initMP</code>方法中，自己创建小程序的App、Page。实现生命周期相关方法，使用<code>callHook</code>代理兼容小程序App、Page的生命周期。</p><p><a href="https://link.juejin.cn/?target=http%3A%2F%2Fmpvue.com%2Fmpvue%2F%23_4" title="http://mpvue.com/mpvue/#_4" target="_blank" rel="noreferrer">官方文档生命周期</a>中说到了：</p><blockquote><p>同 vue，不同的是我们会在小程序 onReady 后，再去触发 vue mounted 生命周期</p></blockquote><p>这部分查看，<code>onReady</code>之后才会执行<code>next</code>，这个<code>next</code>回调最终是vue的<code>mountComponent</code>。可以在<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fruntime%2Findex.js%23L37" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/index.js#L37" target="_blank" rel="noreferrer">index.js</a>中看到。这部分代码也就是解决了&quot;小程序生命周期中触发vue生命周期&quot;。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export function initMP (mpType, next) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>    global.Page({</span></span>
<span class="line"><span>      // 生命周期函数--监听页面初次渲染完成</span></span>
<span class="line"><span>      onReady () {</span></span>
<span class="line"><span>        mp.status = &#39;ready&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        callHook(rootVueVM, &#39;onReady&#39;)</span></span>
<span class="line"><span>        next()</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>在小程序onShow时，使用$nextTick去第一次渲染数据，参考上面提到的render.js。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export function initMP (mpType, next) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>  global.Page({</span></span>
<span class="line"><span>    // 生命周期函数--监听页面显示</span></span>
<span class="line"><span>    onShow () {</span></span>
<span class="line"><span>      mp.page = this</span></span>
<span class="line"><span>      mp.status = &#39;show&#39;</span></span>
<span class="line"><span>      callHook(rootVueVM, &#39;onShow&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 只有页面需要 setData</span></span>
<span class="line"><span>      rootVueVM.$nextTick(() =&gt; {</span></span>
<span class="line"><span>        rootVueVM._initDataToMP()</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>在mpvue-loader生成template时，比如点击事件<code>@click</code>会变成<code>bindtap=&quot;handleProxy&quot;</code>，事件绑定全都会使用<code>handleProxy</code>这个方法。</p><p>可以查看上面<a href="about:blank#mpvue-loader" title="#mpvue-loader" target="_blank" rel="noreferrer">mpvue-loader</a>回顾一下。</p><p>最终handleProxy调用的是event.js中的<code>handleProxyWithVue</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export function initMP (mpType, next) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>    global.Page({</span></span>
<span class="line"><span>      handleProxy (e) {</span></span>
<span class="line"><span>        return rootVueVM.$handleProxyWithVue(e)</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMeituan-Dianping%2Fmpvue%2Fblob%2Fmaster%2Fsrc%2Fplatforms%2Fmp%2Fruntime%2Findex.js" title="https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/index.js" target="_blank" rel="noreferrer">index.js</a></strong></p><p>最后index.js就负责各种初始化和mount。</p><h2 id="class和style为什么暂不支持组件" tabindex="-1">Class和Style为什么暂不支持组件 <a class="header-anchor" href="#class和style为什么暂不支持组件" aria-label="Permalink to &quot;Class和Style为什么暂不支持组件&quot;">​</a></h2><p>原因：目前的组件是使用小程序的 template 标签实现的，给组件指定的class和style是挂载在template标签上，而template 标签不支持 class 及 style 属性。</p><p>解决方案： 在自定义组件上绑定class或style到一个props属性上。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> // 组件ComponentA.vue</span></span>
<span class="line"><span> &lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;container&quot; :class=&quot;pClass&quot;&gt;</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>    props: {</span></span>
<span class="line"><span>      pClass: {</span></span>
<span class="line"><span>        type: String,</span></span>
<span class="line"><span>        default: &#39;&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!--PageB.vue--&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;component-a :pClass=&quot;cusComponentAClass&quot;  /&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>data () {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      cusComponentAClass: &#39;a-class b-class&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;style lang=&quot;stylus&quot; scoped&gt;</span></span>
<span class="line"><span>  .a-class</span></span>
<span class="line"><span>    border red solid 2rpx</span></span>
<span class="line"><span>  .b-class</span></span>
<span class="line"><span>    margin-right 20rpx</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>但是这样会有问题就是style加上scoped之后，编译模板生成的代码是下面这样的：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> .a-class.data-v-8f1d914e {</span></span>
<span class="line"><span>   border: #f00 solid 2rpx;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span> .b-class.data-v-8f1d914e {</span></span>
<span class="line"><span>   margin-right 20rpx</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>所以想要这些组件的class生效就不能使用scoped的style，改成下面这样，最好自己给a-class和b-class加前缀以防其他的文件引用这些样式：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> &lt;style lang=&quot;stylus&quot;&gt;</span></span>
<span class="line"><span>  .a-class</span></span>
<span class="line"><span>    border red solid 2rpx</span></span>
<span class="line"><span>  .b-class</span></span>
<span class="line"><span>    margin-right 20rpx</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style lang=&quot;stylus&quot; scoped&gt;</span></span>
<span class="line"><span>  .other-class</span></span>
<span class="line"><span>    border red solid 2rpx</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>   ...</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul><li>在定义组件上绑定style属性到一个props属性上：</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> &lt;!--P组件ComponentA.vue--&gt;</span></span>
<span class="line"><span> &lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;container&quot; :style=&quot;pStyle&quot;&gt;</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  export default {</span></span>
<span class="line"><span>    props: {</span></span>
<span class="line"><span>      pStyle: {</span></span>
<span class="line"><span>        type: String,</span></span>
<span class="line"><span>        default: &#39;&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!--PageB.vue--&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;component-a :pStyle=&quot;cusComponentAStyle&quot;  /&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>const cusComponentAStyle = &#39;border:red solid 2rpx; margin-right:20rpx;&#39;</span></span>
<span class="line"><span>data () {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      cusComponentAStyle</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;style lang=&quot;stylus&quot; scoped&gt;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>也可以通过定义styleObject，然后通过工具函数转化为styleString，如下所示：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const bstyle = {</span></span>
<span class="line"><span>  border: &#39;red solid 2rpx&#39;,</span></span>
<span class="line"><span>  &#39;margin-right&#39;: &#39;20rpx&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>let arr = []</span></span>
<span class="line"><span>for (let [key, value] of Object.entries(bstyle)) {</span></span>
<span class="line"><span>  arr.push(\`\${key}: \${value}\`)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const cusComponentAStyle = arr.join(&#39;; &#39;)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul><li>当然自定义组件确定只会改变某个css样式，通过pros传入单个样式的值，然后通过:style绑定肯定没问题：</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!--组件ComponentA.vue--&gt;</span></span>
<span class="line"><span> &lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;container&quot; :style=&quot;{&#39;background-color&#39;: backgroundColor}&quot;&gt;</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>    props: {</span></span>
<span class="line"><span>      backgroundColor: {</span></span>
<span class="line"><span>        type: String,</span></span>
<span class="line"><span>        default: &#39;yellow&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!-- PageB.vue --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;component-a backgroundColor=&quot;red&quot;  /&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="分包加载" tabindex="-1">分包加载 <a class="header-anchor" href="#分包加载" aria-label="Permalink to &quot;分包加载&quot;">​</a></h2><p>package.json修改</p><ul><li>升级： &quot;mpvue-loader&quot;: &quot;^1.1.2-rc.4&quot; &quot;webpack-mpvue-asset-plugin&quot;: &quot;^0.1.1&quot;</li><li>新增： &quot;relative&quot;: &quot;^3.0.2&quot;</li></ul><p>注意事项</p><ul><li>1.1.2-rc.5 修复 slot 文件路径生成错误的问题</li><li>1.1.x 版本还不是很稳定，对稳定性要求较高的项目建议暂时使用 1.0.x 版本</li></ul><p>移动src/main.js中config相关内容到同级目录下main.json(新建)中</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>  // config: {...} 需要移动</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>to</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span> &quot;pages&quot;: [</span></span>
<span class="line"><span>   &quot;pages/index/main&quot;,</span></span>
<span class="line"><span>   &quot;pages/logs/main&quot;</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;subPackages&quot;: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      &quot;root&quot;: &quot;pages/packageA&quot;,</span></span>
<span class="line"><span>     &quot;pages&quot;: [</span></span>
<span class="line"><span>       &quot;counter/main&quot;</span></span>
<span class="line"><span>     ]</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span> ],</span></span>
<span class="line"><span> &quot;window&quot;: {...}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>webpack 配置配合升级指南</strong></p><ul><li>本次升级意在调整生成文件目录结构，对依赖的文件由原来的写死绝对路径该改为相对路径</li><li>mpvue-loader@1.1.2-rc.4 依赖 webpack-mpvue-asset-plugin@0.1.0 做依赖资源引用</li><li>之前写在 main.js 中的 config 信息，需要在 main.js 同级目录下新建 main.json 文件，使用 webapck-copy-plugin copy 到 build 目录下</li><li>app.json 中引用的图片不会自动 copy 到 dist 目录下 json 配置文件是由 webapck-copy-plugin copy 过去的，不会处理依赖，可以将图片放到根目录下 static 目录下，使用 webapck-copy-plugin copy 过去</li></ul><p>build/webpack.base.conf.js</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>+var CopyWebpackPlugin = require(&#39;copy-webpack-plugin&#39;)</span></span>
<span class="line"><span>+var relative = require(&#39;relative&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> function resolve (dir) {</span></span>
<span class="line"><span>   return path.join(__dirname, &#39;..&#39;, dir)</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-function getEntry (rootSrc, pattern) {</span></span>
<span class="line"><span>-  var files = glob.sync(path.resolve(rootSrc, pattern))</span></span>
<span class="line"><span>-  return files.reduce((res, file) =&gt; {</span></span>
<span class="line"><span>-    var info = path.parse(file)</span></span>
<span class="line"><span>-    var key = info.dir.slice(rootSrc.length + 1) + &#39;/&#39; + info.name</span></span>
<span class="line"><span>-    res[key] = path.resolve(file)</span></span>
<span class="line"><span>-    return res</span></span>
<span class="line"><span>-  }, {})</span></span>
<span class="line"><span>+function getEntry (rootSrc) {</span></span>
<span class="line"><span>+  var map = {};</span></span>
<span class="line"><span>+  glob.sync(rootSrc + &#39;/pages/**/main.js&#39;)</span></span>
<span class="line"><span>+  .forEach(file =&gt; {</span></span>
<span class="line"><span>+    var key = relative(rootSrc, file).replace(&#39;.js&#39;, &#39;&#39;);</span></span>
<span class="line"><span>+    map[key] = file;</span></span>
<span class="line"><span>+  })</span></span>
<span class="line"><span>+   return map;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   plugins: [</span></span>
<span class="line"><span>-    new MpvuePlugin()</span></span>
<span class="line"><span>+    new MpvuePlugin(),</span></span>
<span class="line"><span>+    new CopyWebpackPlugin([{</span></span>
<span class="line"><span>+      from: &#39;**/*.json&#39;,</span></span>
<span class="line"><span>+      to: &#39;app.json&#39;</span></span>
<span class="line"><span>+    }], {</span></span>
<span class="line"><span>+      context: &#39;src/&#39;</span></span>
<span class="line"><span>+    }),</span></span>
<span class="line"><span>+    new CopyWebpackPlugin([ // 处理 main.json 里面引用的图片，不要放代码中引用的图片</span></span>
<span class="line"><span>+      {</span></span>
<span class="line"><span>+        from: path.resolve(__dirname, &#39;../static&#39;),</span></span>
<span class="line"><span>+        to: path.resolve(__dirname, &#39;../dist/static&#39;),</span></span>
<span class="line"><span>+        ignore: [&#39;.*&#39;]</span></span>
<span class="line"><span>+      }</span></span>
<span class="line"><span>+    ])</span></span>
<span class="line"><span>   ]</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>build/webpack.dev.conf.js</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module.exports = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>   devtool: &#39;#source-map&#39;,</span></span>
<span class="line"><span>   output: {</span></span>
<span class="line"><span>     path: config.build.assetsRoot,</span></span>
<span class="line"><span>-    filename: utils.assetsPath(&#39;js/[name].js&#39;),</span></span>
<span class="line"><span>-    chunkFilename: utils.assetsPath(&#39;js/[id].js&#39;)</span></span>
<span class="line"><span>+    filename: utils.assetsPath(&#39;[name].js&#39;),</span></span>
<span class="line"><span>+    chunkFilename: utils.assetsPath(&#39;[id].js&#39;)</span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span>   plugins: [</span></span>
<span class="line"><span>     new webpack.DefinePlugin({</span></span>
<span class="line"><span>    module.exports = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>     // copy from ./webpack.prod.conf.js</span></span>
<span class="line"><span>     // extract css into its own file</span></span>
<span class="line"><span>     new ExtractTextPlugin({</span></span>
<span class="line"><span>-      filename: utils.assetsPath(&#39;css/[name].wxss&#39;)</span></span>
<span class="line"><span>+      filename: utils.assetsPath(&#39;[name].wxss&#39;)</span></span>
<span class="line"><span>     }),</span></span>
<span class="line"><span>    module.exports = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>       }</span></span>
<span class="line"><span>     }),</span></span>
<span class="line"><span>     new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>-      name: &#39;vendor&#39;,</span></span>
<span class="line"><span>+      name: &#39;common/vendor&#39;,</span></span>
<span class="line"><span>       minChunks: function (module, count) {</span></span>
<span class="line"><span>         // any required modules inside node_modules are extracted to vendor</span></span>
<span class="line"><span>         return (</span></span>
<span class="line"><span>        module.exports = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>       }</span></span>
<span class="line"><span>     }),</span></span>
<span class="line"><span>     new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>-      name: &#39;manifest&#39;,</span></span>
<span class="line"><span>-      chunks: [&#39;vendor&#39;]</span></span>
<span class="line"><span>+      name: &#39;common/manifest&#39;,</span></span>
<span class="line"><span>+      chunks: [&#39;common/vendor&#39;]</span></span>
<span class="line"><span>     }),</span></span>
<span class="line"><span>-    // copy custom static assets</span></span>
<span class="line"><span>-    new CopyWebpackPlugin([</span></span>
<span class="line"><span>-      {</span></span>
<span class="line"><span>-        from: path.resolve(__dirname, &#39;../static&#39;),</span></span>
<span class="line"><span>-        to: config.build.assetsSubDirectory,</span></span>
<span class="line"><span>-        ignore: [&#39;.*&#39;]</span></span>
<span class="line"><span>-      }</span></span>
<span class="line"><span>-    ]),</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><p>build/webpack.prod.conf.js</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>    var webpackConfig = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>   devtool: config.build.productionSourceMap ? &#39;#source-map&#39; : false,</span></span>
<span class="line"><span>   output: {</span></span>
<span class="line"><span>     path: config.build.assetsRoot,</span></span>
<span class="line"><span>-    filename: utils.assetsPath(&#39;js/[name].js&#39;),</span></span>
<span class="line"><span>-    chunkFilename: utils.assetsPath(&#39;js/[id].js&#39;)</span></span>
<span class="line"><span>+    filename: utils.assetsPath(&#39;[name].js&#39;),</span></span>
<span class="line"><span>+    chunkFilename: utils.assetsPath(&#39;[id].js&#39;)</span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span>   plugins: [</span></span>
<span class="line"><span>    var webpackConfig = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>     }),</span></span>
<span class="line"><span>     // extract css into its own file</span></span>
<span class="line"><span>     new ExtractTextPlugin({</span></span>
<span class="line"><span>-      // filename: utils.assetsPath(&#39;css/[name].[contenthash].css&#39;)</span></span>
<span class="line"><span>-      filename: utils.assetsPath(&#39;css/[name].wxss&#39;)</span></span>
<span class="line"><span>+      // filename: utils.assetsPath(&#39;[name].[contenthash].css&#39;)</span></span>
<span class="line"><span>+      filename: utils.assetsPath(&#39;[name].wxss&#39;)</span></span>
<span class="line"><span>     }),</span></span>
<span class="line"><span>     // Compress extracted CSS. We are using this plugin so that possible</span></span>
<span class="line"><span>     // duplicated CSS from different components can be deduped.</span></span>
<span class="line"><span>    var webpackConfig = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>     new webpack.HashedModuleIdsPlugin(),</span></span>
<span class="line"><span>     // split vendor js into its own file</span></span>
<span class="line"><span>     new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>-      name: &#39;vendor&#39;,</span></span>
<span class="line"><span>+      name: &#39;common/vendor&#39;,</span></span>
<span class="line"><span>       minChunks: function (module, count) {</span></span>
<span class="line"><span>         // any required modules inside node_modules are extracted to vendor</span></span>
<span class="line"><span>         return (</span></span>
<span class="line"><span>     var webpackConfig = merge(baseWebpackConfig, {</span></span>
<span class="line"><span>     // extract webpack runtime and module manifest to its own file in order to</span></span>
<span class="line"><span>     // prevent vendor hash from being updated whenever app bundle is updated</span></span>
<span class="line"><span>     new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>-      name: &#39;manifest&#39;,</span></span>
<span class="line"><span>-      chunks: [&#39;vendor&#39;]</span></span>
<span class="line"><span>-    }),</span></span>
<span class="line"><span>+      name: &#39;common/manifest&#39;,</span></span>
<span class="line"><span>+      chunks: [&#39;common/vendor&#39;]</span></span>
<span class="line"><span>+    })</span></span>
<span class="line"><span>-    // copy custom static assets</span></span>
<span class="line"><span>-    new CopyWebpackPlugin([</span></span>
<span class="line"><span>-      {</span></span>
<span class="line"><span>-        from: path.resolve(__dirname, &#39;../static&#39;),</span></span>
<span class="line"><span>-        to: config.build.assetsSubDirectory,</span></span>
<span class="line"><span>-        ignore: [&#39;.*&#39;]</span></span>
<span class="line"><span>-      }</span></span>
<span class="line"><span>-    ])</span></span>
<span class="line"><span>   ]</span></span>
<span class="line"><span> })</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><p>config/index.js</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>     env: require(&#39;./prod.env&#39;),</span></span>
<span class="line"><span>     index: path.resolve(__dirname, &#39;../dist/index.html&#39;),</span></span>
<span class="line"><span>     assetsRoot: path.resolve(__dirname, &#39;../dist&#39;),</span></span>
<span class="line"><span>-    assetsSubDirectory: &#39;static&#39;, // 不将资源聚合放在 static 目录下</span></span>
<span class="line"><span>+    assetsSubDirectory: &#39;&#39;,</span></span>
<span class="line"><span>     assetsPublicPath: &#39;/&#39;,</span></span>
<span class="line"><span>     productionSourceMap: false,</span></span>
<span class="line"><span>     // Gzip off by default as many popular static hosts such as</span></span>
<span class="line"><span>@@ -26,7 +26,7 @@ module.exports = {</span></span>
<span class="line"><span>     port: 8080,</span></span>
<span class="line"><span>     // 在小程序开发者工具中不需要自动打开浏览器</span></span>
<span class="line"><span>     autoOpenBrowser: false,</span></span>
<span class="line"><span>-    assetsSubDirectory: &#39;static&#39;, // 不将资源聚合放在 static 目录下</span></span>
<span class="line"><span>+    assetsSubDirectory: &#39;&#39;,</span></span>
<span class="line"><span>     assetsPublicPath: &#39;/&#39;,</span></span>
<span class="line"><span>     proxyTable: {},</span></span>
<span class="line"><span>     // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h1 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h1>`,143),D=e('<p>以上内容部分来自：</p><ul><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F22754296" title="https://zhuanlan.zhihu.com/p/22754296" target="_blank" rel="noreferrer">微信小程序架构分析 (上)</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F25105936" title="https://zhuanlan.zhihu.com/p/25105936" target="_blank" rel="noreferrer">微信小程序架构解析</a></li><li><a href="https://link.juejin.cn/?target=http%3A%2F%2Fdaxue.qq.com%2Fcontent%2Fonline%2Fid%2F4107" title="http://daxue.qq.com/content/online/id/4107" target="_blank" rel="noreferrer">2018微信公开课第七季上海站·小程序专场</a></li><li><a href="https://juejin.cn/post/6844903548866543623" title="https://juejin.cn/post/6844903548866543623" target="_blank" rel="noreferrer">小程序中使用iconfont</a></li><li><a href="https://link.juejin.cn/?target=http%3A%2F%2Fwww.infoq.com%2Fcn%2Fnews%2F2018%2F07%2Fwchat-miniprog-support" title="http://www.infoq.com/cn/news/2018/07/wchat-miniprog-support" target="_blank" rel="noreferrer">微信小程序的下一步：支持NPM、小程序云、可视化编程、支持分包</a></li><li><a href="https://link.juejin.cn/?target=http%3A%2F%2Fmpvue.com%2Fbuild%2Fmpvue-loader%2F" title="http://mpvue.com/build/mpvue-loader/" target="_blank" rel="noreferrer">mpvue-docs</a></li><li><a href="https://juejin.cn/post/6844903607301570568" title="https://juejin.cn/post/6844903607301570568" target="_blank" rel="noreferrer">使用Mpvue开发微信小程序的最佳实践</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Ftech.meituan.com%2Fmt_mpvue_development_framework.html" title="https://tech.meituan.com/mt_mpvue_development_framework.html" target="_blank" rel="noreferrer">用Vue.js开发微信小程序：开源框架mpvue解析</a></li><li><a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanswershuto%2FlearnVue" title="https://github.com/answershuto/learnVue" target="_blank" rel="noreferrer">learnVue</a></li></ul><p>如果你想学习到更多的前端知识、面试技巧或者一些我个人的感悟，可以关注我的公众号一起学习</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/26/1630013cf4485563~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.image" alt=""></p><p>本文转自 <a href="https://juejin.cn/post/6844903670589423623#heading-0" target="_blank" rel="noreferrer">https://juejin.cn/post/6844903670589423623#heading-0</a>，如有侵权，请联系删除。</p>',5);function M(I,B,W,L,O,R){const n=r("ArticleMetadata"),a=r("ClientOnly");return c(),o("div",null,[u,s(a,null,{default:p(()=>[s(n)]),_:1}),m,d,s(a,null,{default:p(()=>[s(n)]),_:1}),h,s(a,null,{default:p(()=>[s(n)]),_:1}),g,s(a,null,{default:p(()=>[s(n)]),_:1}),v,s(a,null,{default:p(()=>[s(n)]),_:1}),k,s(a,null,{default:p(()=>[s(n)]),_:1}),f,s(a,null,{default:p(()=>[s(n)]),_:1}),x,s(a,null,{default:p(()=>[s(n)]),_:1}),w,s(a,null,{default:p(()=>[s(n)]),_:1}),_,q,y,F,j,s(a,null,{default:p(()=>[s(n)]),_:1}),C,s(a,null,{default:p(()=>[s(n)]),_:1}),P,s(a,null,{default:p(()=>[s(n)]),_:1}),A,s(a,null,{default:p(()=>[s(n)]),_:1}),T,s(a,null,{default:p(()=>[s(n)]),_:1}),S,s(a,null,{default:p(()=>[s(n)]),_:1}),V,s(a,null,{default:p(()=>[s(n)]),_:1}),E,s(a,null,{default:p(()=>[s(n)]),_:1}),D])}const H=t(b,[["render",M]]);export{N as __pageData,H as default};