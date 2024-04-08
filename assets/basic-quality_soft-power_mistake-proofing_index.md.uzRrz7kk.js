import{_ as t,o as i,c as l,J as p,w as r,m as a,a as c,aa as o,E as s}from"./chunks/framework.DJCjJe2w.js";const w=JSON.parse('{"title":"防错思维","description":"","frontmatter":{"createTime":"2022/11/05","tag":"软能力"},"headers":[],"relativePath":"basic-quality/soft-power/mistake-proofing/index.md","filePath":"basic-quality/soft-power/mistake-proofing/index.md","lastUpdated":1667654926000}'),b={name:"basic-quality/soft-power/mistake-proofing/index.md"},u=a("h1",{id:"防错思维",tabindex:"-1"},[c("防错思维 "),a("a",{class:"header-anchor",href:"#防错思维","aria-label":'Permalink to "防错思维"'},"​")],-1),d=o(`<blockquote><p>最好的防守，就是进攻。</p><p>最好的防错方式，就是一次做对。</p></blockquote><h2 id="如果不防错-后果很严重" tabindex="-1">如果不防错，后果很严重 <a class="header-anchor" href="#如果不防错-后果很严重" aria-label="Permalink to &quot;如果不防错，后果很严重&quot;">​</a></h2><p>在之前的章节中，我介绍了“根因思维”，这是一种问题出现后进行事后补救的工程思维。</p><p>然而，经验告诉我们，问题出现事后补救的代价往往非常大。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64c29da4acd64d47a09dc2839df4c8e3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="崩溃2.jpeg"></p><p>比如，如果你读过本系列之前的文章，那么你应该还记得“出了故障一年白干”的说法。</p><p>在我打工的公司，一旦发生线上故障就有可能出现资金损失，事后补救不论多难多复杂也得含着泪也得做完，当然，故障责任人这一年肯定就算是白干了（奖金没了不说，绩效估计也够呛）。</p><p>又比如，你买了一套自组装的家具，装到最后才发现自己把一个零件装反了，这又导致最后一个零件死活都装不进去，在捶胸顿足了五分钟之后，你决定全部推倒重来。</p><p>再比如，汽车自动驾驶算法设计存在缺陷，在高速上出现误判，导致汽车驾驶员车祸身亡。对于驾驶员的家人来说，事后补救形同于事无补。</p><p><strong>那么，既然事后修补的成本很高，我们就会想，我们能否在事前就避免错误的发生呢？</strong></p><p>答案是肯定的。</p><p>按照事前-事中-事后的分析方法，我们的确可以在事前识别可能的错误并予以避免。</p><p>在工程实践中，我们把这种事先预判并避免错误发生的工程思维，称为防错思维。</p><p>相应地，与防错思维结合的设计方式和防错装置被称作防错设计。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70599df757b54eb28dde52f81c95bf82~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="插头.jpeg"></p><p>当然，任何一种思维工具都有其适用范围，防错思维也不是万能的，它只能预判并避免已知问题，对于未知问题的防范，人们目前能采取的手段只能是事后补救。</p><p>下面，在深入了解“防错思维”和“防错设计”的概念之前，我会先分享一个自己亲历过的线上故障——这是一个因为交集函数没有做防错设计而导致的线上故障，引发这个故障的错误很小——就一行代码的事情，但是却让我和同事一起花了2天时间做了2次紧急发布才完全修复。</p><p>到最后，虽然我们都没有因为这个故障而“一年白干”，但是这个故障排查的过程不可谓不曲折，给我留下的印象不可谓不深刻。</p><p>这么多年过去了，在看过这么多的故障之后，我深深意识到：一个工程师若是没有防错思维和防错设计的加持，想要走远真的很难。</p><p>废话不说，故事开始。</p><h2 id="一行代码让人疯狂两天" tabindex="-1">一行代码让人疯狂两天 <a class="header-anchor" href="#一行代码让人疯狂两天" aria-label="Permalink to &quot;一行代码让人疯狂两天&quot;">​</a></h2><p>事故（故事）开头，还得从当时我们维护的融资系统说起。</p><p>这个融资系统负责处理用户的融资请求。</p><p>它有一个重要的功能，就是查询融资发起者的所有交易记录。</p><p>一般来说，一个融资发起者会有多笔交易记录，而这些交易记录往往来自于自不同的供应商。</p><p>依照业务需求，查询时银行不需要全部的交易记录，它只需要这个融资者名下指定供应商的交易记录。为了满足这个需求，我们在系统里为不同银行维护了一个供应商列表——银行供应商白名单（第一个白名单列表）。</p><p>在融资者发起融资时，我们的系统会查询融资者在这个“银行供应商白名单”下的所有交易记录。</p><p>听上去不就是一个CRUD的R吗？是不是很简单？</p><p>别急，业务上还有另外一个需求。</p><p>我们的业务还说，并不是银行指定了供应商白名单，我们的系统就一定得完全按着这个白名单来查询交易记录。</p><p>为了能够在业务侧控制风险，业务上还为每个融资者设计了一个可融资的供应商列表——融资者供应商白名单（第二个白名单列表）。</p><p>所以，融资者实际可融资的供应商白名单 = 融资者供应商白名单和银行供应商白名单的交集。</p><p>综上，在融资发起时，我们的系统会查询融资者在实际可融资的供应商白名单下的所有交易记录。</p><p>已经看晕了？</p><p>别慌，不妨让我们举个例子。</p><blockquote><p>若融资者A要在银行B发起融资。</p><p>已知，融资者A的融资者供应商白名单是[供应商1，供应商2，供应商3]。</p><p>银行B的银行供应商白名单是[供应商1，供应商2]</p><p>那么融资者A涉及在银行B的可融资供应商列表就是[供应商1，供应商2]。</p><p>在融资发起时，系统会查询融资者A在[供应商1，供应商2]下的所有交易记录。</p></blockquote><p>事实上，整个业务逻辑并不复杂，取两个集合的交集而已，我想当时我们的研发同学肯定也都理解了这个需求。</p><p>然而，在我们实现这个交集逻辑时，问题还是出现了。</p><p>（这里先让我们暂停5分钟，读者可以自行思考一下这个交集逻辑如何用代码实现。）</p><p>在融资系统里，我们的开发同学把交集逻辑封装成了一个函数，而其中的代码逻辑是这样的：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def calcActualWhitelist(bank_supplier_whitelist_set, supplier_whitelist_set):</span></span>
<span class="line"><span></span></span>
<span class="line"><span> # 取交集</span></span>
<span class="line"><span> bank_supplier_whitelist_set.intersection_update(supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return list(bank_supplier_whitelist_set)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>（注：在此python仅是示例，实际工作中我们用java，而且，实际的白名单计算函数比例子要复杂的多。）</p><p>怎么样？能看出代码中的问题吗？</p><p>实际上，我所经历过的绝大多线上故障的发现，大都来自客户的咨询（怒骂）。由于我们系统的代码量非常大，所以很少有线上故障是通过直接读代码的方式发现的。</p><p>例子中的这个故障的发现过程也不例外。</p><p>当时的情况是，有一个融资者发现查询出的交易列表和预期不符，于是向我们咨询，希望我们排查一下。</p><p>接到这样的咨询，我的第一反应是这个问题可能会比较严重，当时我脑袋“砰”地一下就“炸”开了。</p><p>要知道，如果我们查询出的交易列表不正确，那么融资者在融资时可能会多融资或者少融资（具体多少取决于交易列表是多了还是少了），对一分钱都不能错的金融科技公司来说，这是一个非常非常严重的问题——这意味着资损（资金损失）发生了！</p><p>毕竟身经百战，很快冷静下来之后，我当即丢下了手头的事情，开始排查这个问题。</p><p>一般来说，导致查询出的交易列表不正确的原因有很多。比如，数据源不正确，数据过滤逻辑不正确，白名单配置不正确等等，我只能用排除法对所有可能的问题逐个排除。</p><p>遗憾的是，总有一些没有明显线索的问题，这些问题是无法被直接排除，这个时候我就只能尝试在开发环境试跑，希望可以复现问题。</p><p>比如，为了复现这个问题，我在开发环境还原了生产的数据状况，只是这一招在当时并没能定位问题。</p><p>到最后，我只能使出杀手锏——走读代码。</p><p>为了避免独自一人读代码陷入思维盲区，我甚至把同事拉进了这滩浑水。</p><p>在一行行地看过所有的代码之后，我们终于把怀疑目标锁定到前文中计算白名单列表的交集函数上来。（因为当时我们实在是看不出来哪里还能有问题了。）</p><p>但怀疑终归只是怀疑，由于这个函数并没有打印任何日志，所以我们无法通过查看线上日志的方式验证我的怀疑。</p><p>于是，为了验证我的怀疑，我在交集函数中补充了日志打印的代码，做了一个紧急发布，之后才通过日志验证了我的怀疑是正确的。</p><p>（笔者注：这里也有可能是我记错了，第一次发布可能就是为了修复问题，但是失败了，所以才有了第二次发布。不过这不影响这个例子想要表达的意义。）</p><p>到了第二天，我们又做了一次紧急发布，修复了交集函数中的bug，这才算是修复了问题。</p><p>现在，让我们回到有问题的交集函数上。</p><p>不妨让我们再回顾一下这个函数：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def calcActualWhitelist(bank_supplier_whitelist_set, supplier_whitelist_set):</span></span>
<span class="line"><span></span></span>
<span class="line"><span> # 取交集</span></span>
<span class="line"><span> bank_supplier_whitelist_set.intersection_update(supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return list(bank_supplier_whitelist_set)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>现在，看出问题了吗？</p><p>这段交集函数的最大问题在于，运行时会改变银行供应商白名单当中的内容。比如下面的代码示例：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> # A银行0供应商白名单</span></span>
<span class="line"><span> a_bank_supplier_whitelist_set = set([1,2,3,4])</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> # A融资者-供应商白名单</span></span>
<span class="line"><span> a_supplier_whitelist_set = set([2,3])</span></span>
<span class="line"><span></span></span>
<span class="line"><span> b_supplier_whitelist_set = set([1,2,3,4])</span></span>
<span class="line"><span></span></span>
<span class="line"><span> print(&quot;最初时银行的供应商列表&quot;)</span></span>
<span class="line"><span> print(a_bank_supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> print(&quot;-------A融资者融资--------&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> # A融资者-实际白名单</span></span>
<span class="line"><span> a_actual_supplier_whitelist = calcActualWhitelist(a_bank_supplier_whitelist_set, a_supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> print(&quot;A融资者的实际白名单&quot;)</span></span>
<span class="line"><span> print(a_actual_supplier_whitelist)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> print(&quot;-------中间值--------&quot;)</span></span>
<span class="line"><span> print(&quot;A融资者计算后计银行的供应商列表&quot;)</span></span>
<span class="line"><span> print(a_bank_supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> print(&quot;-------B融资者融资--------&quot;)</span></span>
<span class="line"><span> # B融资者-实际白名单</span></span>
<span class="line"><span> b_actual_supplier_whitelist = calcActualWhitelist(a_bank_supplier_whitelist_set, b_supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> print(&quot;B融资者的实际白名单&quot;)</span></span>
<span class="line"><span> print(b_actual_supplier_whitelist)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>这段代码的实际运行结果如下：</p><blockquote><p>最初时银行的供应商白名单：set([1, 2, 3, 4])</p><p>-------A融资者融资--------</p><p>A融资者的实际白名单：[2, 3]</p><p>-------中间值--------</p><p>A融资者计算后计银行的供应商白名单：set([2, 3])；注意，到这里银行的白名单已经被修改了</p><p>-------B融资者融资--------</p><p>B融资者的实际白名单：[2, 3]；注意：这里已经错了，预期结果应该是[1,2,3,4]</p></blockquote><p>这个意料之外的副作用，虽然很多编程教材上都有强调（关于值传递还是引用传递的讨论），但是写代码的同学还是疏漏了。</p><p>至于测试同学，我估计是因为测试同学一直都是用同一个融资者做测试，所以他们也没有测出来——于是问题就这么溜上线了。</p><p>定位问题之后，修复方案就简单多了——也就一行代码的事情——我们可以把白名单的备份传入这个交集函数，如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>a_actual_supplier_whitelist = calcActualWhitelist(set(a_bank_supplier_whitelist_set), set(a_supplier_whitelist_set))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>又或者，我们可以让函数自己负责防错，这样的自检其实更合理一些，如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def calcActualWhitelist(bank_supplier_whitelist_set, supplier_whitelist_set):</span></span>
<span class="line"><span></span></span>
<span class="line"><span> # 复制一份数据</span></span>
<span class="line"><span> bank_supplier_whitelist_set = set(bank_supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> # 取交集</span></span>
<span class="line"><span> bank_supplier_whitelist_set.intersection_update(supplier_whitelist_set)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return list(bank_supplier_whitelist_set)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>当然，我知道你肯定能想到了更优雅的防错方案，若是的话，欢迎在评论区里留言让我们知道。</p><p>可以看到，这是一个典型的没有考虑防错设计的小错误导致大问题的例子。</p><p>如果我是面试官，那么我一定会把这个案例作为一个考题来检查面试者的设计能力。</p><p>那么，我的故事到此就结束了。到了这里，我想你已经对防错设计的重要性有一个初步的认识了。</p><p>下面，不妨让我们聊一点深入的话题。</p><h2 id="什么是防错思维" tabindex="-1">什么是防错思维 <a class="header-anchor" href="#什么是防错思维" aria-label="Permalink to &quot;什么是防错思维&quot;">​</a></h2><p>人非圣贤，孰能无过？</p><p>既然犯错如此容易，那么我们必然就得考虑如何防止犯错。</p><p>在工程上，对于一个产品或者一种生产流程来说，在设计阶段就应该考虑使用者犯错的可能性。</p><p><strong>事先通过巧妙的设计来避免错误，让产品或者生产流程永远只有一种使用方式或者操作方式——正确的那一种——这样的设计就是防错设计，而这样的设计思路就是防错思维。</strong></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08a749d7ff3344a580392d0eccc4e85a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="什么是防错思维.jpeg"></p><p>需要注意的是，我们说通过设计来避免错误，这就意味着我们不能把“错误的使用方式”写在说明书里或者写在文档里——加黑加粗醒目高亮都不行。</p><p>因为，时间是无价的，没人愿意花功夫去读厚厚的说明书和又臭又长的使用文档——在最好的防错设计中，对错误的使用方式的避免是“设计在”产品中，在用户使用产品时自然而然地就避免了错误，而不是把“防错事项”做成一个可有可无的说明书交给用户——用户不可能比设计者（你）更懂这个产品——而这种转移责任的行为，反而是一种不敬业、不专业的表现。</p><p>那么，什么叫把对错误的避免“设计在”产品里呢？</p><p>这里不得不提起一个大家都用过的臭名昭著的设计，直接上图。   <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35cdb93353f2433a983296f4400e2d98~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="usb.jpeg"></p><p>用过的人都知，USB接口是长方形的，有两个方向可以尝试插入（所以有两种使用方法：正确的和错误的），非常容易插错。</p><p>运气好的时候，一次就可以成功。但是在运气不好的时候，你就得插两次甚至三次。</p><p>其实在设计的之初，USB接口已经考虑了防错设计。在方向错误的情况下，USB接口是无法插入的。但是槽点在于，这样的防错设计是以用户的亲自试错为代价的——还记得每次用USB接口插入失败的沮丧心情吗？</p><p>换言之，这样的防错设计是被动式的，它把压力转嫁给了用户，需要用户参与甚至需要用户付出一定的代价才能达到防错的目。</p><p>这样让人恼火的设计，被网友们捶爆就不奇怪了，比如在网上流传着这样的段子：</p><blockquote><p>据说USB接口的发明者去世的时候，棺材总共往墓穴里放了三次。</p><p>第一次，棺材放了一半卡住了。</p><p>于是大家把棺材吊出来，第二次放的时候转了180度，又卡住了。</p><p>于是大家又把棺材吊出来，第三次又转了180度，成功放进去了。</p><p>此时大家才发现原来第一次的方向就已经是正确的了。</p></blockquote><p>那么，同样是接口，有没有比USB接口更靠谱的设计呢？</p><p>别说，还真有，继续上图。 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b30c2a4ab0640888422a83af5a7f735~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="type-c.jpeg"></p><p>使用Type-C接口时，虽然和USB接口一样还是有两个方向插入，但是这两个方向都是正确的，用户完全不会有插错的心理负担。甚至，初次使用的用户压根就不知道自己会犯错。</p><p>这是一个典型的主动式防错设计——这样的防错通过设计完成，完全不需要用户感知。</p><p>没有对比就没有伤害，通过USB接口和Type-C接口的例子可以看到，具备防错设计的产品，可以极大地提升用户体验，避免不必要的错误。</p><p>更重要的是，我们还可以看到，一个完整的设计实际上分为两部分——对正常功能的设计（正确的使用方式）和对异常情况（错误的使用方式）的避免的设计。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06dfeee64c014991aa4a81ad56c90347~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="阴阳.jpeg"></p><p>在工作中，很多工程师只考虑了前一种设计而忽视/遗漏了后一种设计，我想这就是这些工程师看上去都非常忙的原因——他们的时间大都花在了事后的补救上，这把他们的精力都耗光了——难怪最后他们会变成平庸之辈。</p><p>而卓越工程师则恰恰相反，他们早就把防错设计融汇在了自己的工作和生活中——在实践中灵活应用防错设计的防错思维，在第一次就把所有的事情做对。</p><p>当然，如果你和笔者一样是一个软件工程师（其他行业也大同小异），你应该知道并不是每一个人都能从0到1开始设计和研发一个新的产品（系统、流程），很多时候我们都是在前人已经设计好的产品（系统、流程、规范）上修修补补，此时我们当然也可以使用防错思维和防错设计，但是已有的设计已经在那里了，其中难免存在着固有的设计缺陷，这难免会让使用防错设计的成本增加不少，不过这不是不使用防错设计的理由。</p><p>总之，作为一名力争卓越的工程师，一旦我们开始设计，我们就得考虑这个设计被错误理解和错误使用的可能性，并且想方设法避免这种可能性在我们的生活和工作中发生——这就是防错思维。</p><p>而防错思维的具体应用，就是防错设计。</p><h2 id="防呆不防傻-大力出奇迹" tabindex="-1">防呆不防傻,大力出奇迹 <a class="header-anchor" href="#防呆不防傻-大力出奇迹" aria-label="Permalink to &quot;防呆不防傻,大力出奇迹&quot;">​</a></h2><p>防错设计还有一个称呼——防呆设计。</p><p>防呆设计的概念源于日本，是为了避免工人在生产线上犯错、减轻工人的认知负担而做的设计。</p><p>防呆设计的英文为fool-proof，日语拼音为poka-yoke。</p><p>一般来说，实现防呆设计（防错设计）有如下具体的要求：</p><blockquote><p>1）具有即使有人为疏忽也不会发生错误的构造──不需要注意力——无脑。</p><p>2）具有外行人来做也不会错的构造──不需要经验与直觉——还是无脑。</p><p>3）具有不管是谁或在何时工作都不会出差错的构造──不需要专门知识与高度的技能——还是无脑。</p></blockquote><p>当然，我们还说：</p><blockquote><p>防呆不防傻，因为大力出奇迹。</p></blockquote><p>在后文中，我将会交替使用“防呆设计”和“防错设计”，在本文中二者含义相同。</p><h2 id="生活处处有防错" tabindex="-1">生活处处有防错 <a class="header-anchor" href="#生活处处有防错" aria-label="Permalink to &quot;生活处处有防错&quot;">​</a></h2><p>为了让大家对防错思维和防错设计有一个更直观的认识，我们将探讨更多“防错设计”的列子。</p><h2 id="_1-有缺角的sim卡" tabindex="-1">1）有缺角的SIM卡 <a class="header-anchor" href="#_1-有缺角的sim卡" aria-label="Permalink to &quot;1）有缺角的SIM卡&quot;">​</a></h2><p>下图是一张SIM卡。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b59ecef55ee495899ac79aa4d45da4b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="sim卡.jpeg"></p><p>仔细观察的话，会发现SIM卡被故意设计成一个有缺角的长方形，为什么？</p><p>想想看，如果SIM卡没有这个缺角并且是一个正方形，会有多少种安装方式？</p><p>答案是8种，1种正确方式，7种错误方式。</p><p>如果SIM卡是一个长方形但是没有这个缺角，会有多少种安装方式？</p><p>答案是4种，1种正确方式，3种错误方式。</p><p>正是因为有了这个缺角，才使得我们在装SIM卡时，只会有一种安装方式——正确的那一种。</p><p>这样设计的SIM卡，在没有任何说明的情况下，你也不会（也无法）装错。</p><h2 id="_2-苹果手机的闹铃" tabindex="-1">2）苹果手机的闹铃 <a class="header-anchor" href="#_2-苹果手机的闹铃" aria-label="Permalink to &quot;2）苹果手机的闹铃&quot;">​</a></h2><p>这是某一次我的苹果手机在闹铃响起时的截图，如下：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df96e7a94b66487a968e49213392333c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="苹果闹钟.jpeg"></p><p>仔细观察的话，会发现看似简单按钮排布，却充满了防错设计的玄机：</p><blockquote><p>其一，“稍后提醒”按钮颜色显眼位置居中体形巨大，就怕一个睡醒的人按错；</p><p>其二，“停止”按钮则放在底部不起眼的位置，没睡醒的人很难按到这个按钮；</p><p>其三，其他所有的物理按键全部等同于“稍后提醒”，即便错按也不会因关掉闹铃而误事；</p></blockquote><p>这样的设计，其实就是对用户当前意识状态的测试：</p><blockquote><p>无论是睡醒的人，还是半迷半醒的人，经过这样的测试之后，按错的概率会降低很多。</p></blockquote><p>从这个例子里可以看出，防错设计的目的最终还是要服务于产品本身的目的。对于苹果手机的闹铃来说，它的目的就是尽可能地把你叫醒。</p><p>当然，还是那句话，防呆不防傻——毕竟，我们永远也叫不醒一个装睡的人。</p><p>（安卓手机的闹铃我没研究过，有研究过的朋友可以留言分享给大家。）</p><h2 id="_3-火车站里的自动售票机" tabindex="-1">3）火车站里的自动售票机 <a class="header-anchor" href="#_3-火车站里的自动售票机" aria-label="Permalink to &quot;3）火车站里的自动售票机&quot;">​</a></h2><p>下图中是火车站中的自动售票机。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c875de045d54a7a9bb53bf87fc42d49~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="火车售票机.jpeg"></p><p>仔细观察的话会发售票机上放置身份证的位置是一个斜面，为什么？</p><p>买票的时候，你必须用一只手一直扶着身份证，否则你的身份证会滑落下去。</p><p>这样设计的目的是防止旅客把自己的身份证遗忘在售票机上。</p><p>说实话，如果不是写这篇文章，笔者都不会注意到这个防错设计——可见优秀的防错设计是隐藏在设计中的，在使用的过程中是完全没有感知的。</p><h2 id="_4-每次旅行前的个人物品checklist" tabindex="-1">4）每次旅行前的个人物品checklist <a class="header-anchor" href="#_4-每次旅行前的个人物品checklist" aria-label="Permalink to &quot;4）每次旅行前的个人物品checklist&quot;">​</a></h2><p>这里再补充一个笔者自己的生活防错措施。</p><p>每次出行前打包行李的时候，笔者都会按照这个checklist进行检查，避免忘记重要的物品。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0506eebade354ca2b38980b95253eae9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?" alt="checklist.jpeg"></p><p>有趣的是，笔者有一个朋友也有一个checklist，他是为了避免在去游泳时忘带重要的装备而设置的。</p><p>比如说，泳裤、泳镜或者泳帽之类的。而笔者自己就忘拿过泳裤，而且是在打车到游泳馆、买了票、进到更衣室、脱了衣服之后才发现的……</p><p>值得一提的是，checklist确实是一种高效的防错手段，有兴趣的读者可以阅读《清单革命》一书，这本书对checklist有详细的介绍，本文就不再展开了。</p><p>通过上面的例子可以看到，即便你没有完全意识到，但是防错设计和防错思维在我们的生活中早已经无处不在。</p><p>如果你也遇到过类似的防错设计，不妨在在评论区留个言让大家知道。</p><p>好了，看了这么多别人的防错设计，那么对于一名软件工程师来说，他/她该如何做防错设计呢？</p><h2 id="软件工程中的防错设计" tabindex="-1">软件工程中的防错设计 <a class="header-anchor" href="#软件工程中的防错设计" aria-label="Permalink to &quot;软件工程中的防错设计&quot;">​</a></h2><h2 id="首先-确定防错的具体范围" tabindex="-1">首先，确定防错的具体范围 <a class="header-anchor" href="#首先-确定防错的具体范围" aria-label="Permalink to &quot;首先，确定防错的具体范围&quot;">​</a></h2><p>软件工程师如何做防错设计？</p><p>这是一个很大的话题，为了让这个话题变成一个可执行的指导，首先我们应该明确（缩小）问题覆盖的范围。</p><p>在笔者看来，从宏观的架构到微观的编码，软件工程师的工作大体在四个层次进行：</p><p>1）产品</p><p>2）服务/功能</p><p>3）模块/函数</p><p>4）文档</p><p>相应的，防错设计也应该在这四个层次展开，如下表所示：</p><table><thead><tr><th><strong>工作层次</strong></th><th><strong>防错内容</strong></th><th><strong>参与角色</strong></th></tr></thead><tbody><tr><td>产品</td><td>避免产品被用户误用，确保产品只有一种正确的使用方式</td><td>产品、架构师</td></tr><tr><td>服务/功能</td><td>避免服务/功能被调用方误用，确保服务和功能只有一种正确的使用方式</td><td>架构师</td></tr><tr><td>模块/函数</td><td>确保模块和函数只有一种正确的使用方式</td><td>研发</td></tr><tr><td>文档</td><td>确保产出的文档不会被其他读者误解</td><td>研发</td></tr></tbody></table><h2 id="其次-确定进行防错的具体环节" tabindex="-1">其次，确定进行防错的具体环节 <a class="header-anchor" href="#其次-确定进行防错的具体环节" aria-label="Permalink to &quot;其次，确定进行防错的具体环节&quot;">​</a></h2><p>在软件设计的四个层次中的任意一个层次上，我们可以在事前-事中-事后三个环节上进行防错，具体如下：</p><h3 id="_1-事前-通过提前设计-直接消除错误" tabindex="-1">1）事前：通过提前设计，直接消除错误 <a class="header-anchor" href="#_1-事前-通过提前设计-直接消除错误" aria-label="Permalink to &quot;1）事前：通过提前设计，直接消除错误&quot;">​</a></h3><p>比如，在产品设计阶段，我们能够预判出可能的犯错问题，此时就可以通过设计来避免问题的出现。</p><p>当然，预判的前提是设计者具有丰富的经验、能够提前发现问题，因此这个阶段往往会让有多年经验的产品经历或者架构师操刀。</p><p>又比如，本文开头例子中的交集函数，如果是一个经验丰富的人来设计和实现，显然就不会出错。</p><h3 id="_2-事中-即使犯错也不会导致问题" tabindex="-1">2）事中：即使犯错也不会导致问题 <a class="header-anchor" href="#_2-事中-即使犯错也不会导致问题" aria-label="Permalink to &quot;2）事中：即使犯错也不会导致问题&quot;">​</a></h3><p>当然，事前拦截并不一定都能成功，所以我们希望即便在事前出了问题，在事中也不会危及系统的运行。</p><p>比如，在API服务中，我们会加上业务校验。如果调用者不满足业务校验，那么API拒绝提供服务，并返回明确的错误信息。</p><p>又比如，在我们的系统中，有些操作的失败是可以接受的，此时就继续运行，不影响最终结果——我们管这个叫失败降级。</p><h3 id="_3-事后-犯错能被快速发现和修复" tabindex="-1">3）事后：犯错能被快速发现和修复 <a class="header-anchor" href="#_3-事后-犯错能被快速发现和修复" aria-label="Permalink to &quot;3）事后：犯错能被快速发现和修复&quot;">​</a></h3><p>如果在事前和事中都没能有效防错，那么我们只能在事后进行防错布局了——因为在事后环节问题已经发生了，而我们又无法主动避免问题（这是事前该做的事前），那么我们至少要有快速发现问题和修复问题的能力（检测能力）。</p><p>因此，在产品设计的初期时，就要将产品的监控能力和熔断能力一并考虑，这是事前和事中防错失败之后，软件工程师可以依靠的最后一根救命稻草。</p><p>能够走到事后防错这一步，说明我们遇上了意料之外的问题，现在该如何处理呢？这其实就回到了这个系列文章曾经讨论过的“根因思维”和“复盘思维”中的问题处理方法，本文就不再赘述了。</p><p>比如，本文第二小节问题交集函数的例子，其实就是一次事后的问题处理。</p><p>顺带一提，从事前防错到事后防错，其实也是一个从已知走向未知的过程。</p><p>确定了引入防错设计的具体环节之后（一般都是在事前、事中），下一步就是使用具体的防错方法了。</p><h2 id="最后-使用具体的防错方法" tabindex="-1">最后，使用具体的防错方法 <a class="header-anchor" href="#最后-使用具体的防错方法" aria-label="Permalink to &quot;最后，使用具体的防错方法&quot;">​</a></h2><p>一般来说，常用的防错方法有以下五种，见下表格：</p><table><thead><tr><th><strong>方法</strong></th><th><strong>说明</strong></th><th><strong>例子</strong></th></tr></thead><tbody><tr><td>消除</td><td>消除可能的失误</td><td>本文第二节中的修改后的交集函数</td></tr><tr><td>替代</td><td>用更可靠的流程代替</td><td>从手动拉取文件变为程序拉取文件</td></tr><tr><td>简化</td><td>使作业更容易完成</td><td>支付时，不输入密码而是刷脸</td></tr><tr><td>检测</td><td>失误时自动提示，防止错误和缺陷扩大</td><td>API服务中有参数校验，建设系统监控能力</td></tr><tr><td>减少</td><td>将失误的影响降到最低</td><td>交易系统的发现能力和熔断能力</td></tr></tbody></table><p>当然，具体的防错方法还是要根据实际情况具体选择，不能一概而论。</p><p>总之，如果一个产品能够通过防错设计在事前避免80%的问题，而另外20%的问题能够在事中和事后快速发现和处理，我们就认为这个产品已经比较健壮了（金融科技的信息系统要求只会更高）。</p><p>在理想状态下，最好能够通过设计解决100%的问题最好的防错。</p><p>毕竟，最好的防错就是第一次就把事情做对。</p><h2 id="组合使用" tabindex="-1">组合使用 <a class="header-anchor" href="#组合使用" aria-label="Permalink to &quot;组合使用&quot;">​</a></h2><p>防错思维是一个非常底层的思维工具，只要涉及到设计、计划、沟通、执行等可能存在预期和实际不符的场景，防错思维就一定有用武之地。</p><p>防错思维可以和飞轮思维和迭代思维结合，确保在使用后者时不会出现偏差。</p><p>防错思维中的事后防错可以和根因思维和复盘思维结合，把问题从未知推向已知，可以让我们更好地避免错误的发生。</p><p>防错思维的执行，还可以和迭代思维和灰度思维结合。</p>`,194);function h(m,_,k,f,g,q){const n=s("ArticleMetadata"),e=s("ClientOnly");return i(),l("div",null,[u,p(e,null,{default:r(()=>[p(n)]),_:1}),d])}const y=t(b,[["render",h]]);export{w as __pageData,y as default};