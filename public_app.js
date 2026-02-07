let page=1

async function load(){
 const res=await fetch(`./api/anime?page=${page}`)
 const data=await res.json()
 const c=document.getElementById("content")
 data.forEach(i=>{
  const d=document.createElement("div")
  d.className="card"
  d.innerHTML=`<a href="${i.link}">${i.title}</a>`
  c.appendChild(d)
 })
 page++
}

load()

window.addEventListener("scroll",()=>{
 if(window.innerHeight+window.scrollY>=document.body.offsetHeight-400){
  load()
 }
})

const ws=new WebSocket(`ws://${location.host}`)
ws.onmessage=e=>{
 const data=JSON.parse(e.data)
 if(data.type==="anime"){
  location.reload()
 }
}
