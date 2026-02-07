const WebSocket=require("ws")

function startWS(server){
 const wss=new WebSocket.Server({server})

 wss.broadcast=(msg)=>{
  wss.clients.forEach(c=>{
   if(c.readyState===WebSocket.OPEN){
    c.send(JSON.stringify(msg))
   }
  })
 }

 return wss
}

module.exports={startWS}