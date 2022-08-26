const $siteList=$('.siteList')
const $lastLi=$siteList.find('li.last')
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)//JSON.parse把字符串变成对象
const hashMap=xObject||[
    {logo:'V',url:'https://cn.vuejs.org/index.html'},
    {logo:'I',url:'https://iconfont.cn/'}
]
localStorage.setItem('x',JSON.stringify(hashMap))
const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')//删除以/开头的内容
}
const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
    const $li=$(`<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-x"></use>
                        </svg>
                    </div>
                </div>
                </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            const string=JSON.stringify(hashMap)
            localStorage.setItem('x',string)
            render()
        })
    })
}

render()
$('.addButton').on('click',()=>{
        let url=window.prompt('请输入要添加的网站')
        if(url.indexOf('http')!==0){
            url='https://'+url
        }
        hashMap.push({
            logo:simplifyUrl(url)[0].toUpperCase(),//toUpperCase()把字符变大写，还可以在CSS中设置text-transf：uppercase；设置
            url:url
        })
        const string=JSON.stringify(hashMap)
        localStorage.setItem('x',string)
        render()
})
// window.onbeforeunload=()=>{
//     const string=JSON.stringify(hashMap)//JSON.stringify可以把对象变成字符串
//     localStorage.setItem('x',string)
// }
$(document).on('keypress',(e)=>{
    const key=e.key/*可以简写为const {key}=e */
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})