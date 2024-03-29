/*把code写到#code和style标签里*/
function writeCss(prefix, code, fn){
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix +  code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 70)
}
function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

var css1 = `/* 
 * 大家好，我是李致远
 * 只用文字做自我介绍太单调了
 * 我就用代码来介绍吧
 * Talk is cheap, Let's code! 
*/

/* 首先准备一些样式 */
*{
  transition: all 1.5s;
}
/* 白色背景太单调了，我们来点背景 */
html{
  background: #333;
}
/* 文字离边框太近了 */
#code{
  border: 2px solid #aaa;
  padding: 16px;
}

/* 还需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始 */

/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
var md = `
# 李致远

程序员、研究员、教师

# 工作经历

- 腾讯科技（深圳）有限公司 腾讯游戏事业群 增值服务部 
- 三快科技（美团）有限公司 基础研发平台 富文本编辑器 
- XX部XXXX研究院 战略研究所 网络安全研究
- 南京科技职业学院 信息工程学院 专任教师

# 所教课程

1. 面向对象程序设计
2. Node.js
3. 软件测试
4. Html前端开发
5. 计算思维与实用技术

# 技能竞赛

- 信息安全管理

# 联系方式

- QQ 52495593
- Email lizhiyuan@njpi.edu.cn
- 手机 18136561858
- 办公室 3323
`
let css3 = `
/*
 * 这就是我的自我介绍
 * 学会这门课
 * 编写自己的简历
 */
`

writeCss('', css1, ()=>{ // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, ()=> {
      writeCss(css1, css2, ()=>{
        convertMarkdownToHtml(()=>{
          writeCss(css1 + css2, css3, ()=> {
            console.log('完成')
          })
        })
      })
    })
  })
})




function createPaper(fn){
  var paper = document.createElement('div') 
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

