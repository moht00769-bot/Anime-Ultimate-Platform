const express=require("express")
const cors=require("cors")
const helmet=require("helmet")
const compression=require("compression")
const http=require("http")

const {db,init}=require("./database")
const {register,login,verify}=require("./auth")
const {startScheduler}=require("./scheduler")
const {startWS}=require("./websocket")

const app=express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.static("public"))

app.post("/register",async(req,res)=>{
 await register(req.body.username,req.body.password)
 res.json({ok:true})
})

app.post("/login",async(req,res)=>{
 const token=await login(req.body.username,req.body.password)
 if(!token)return res.sendStatus(401)
 res.json({token})
})

app.get("/api/:type",(req,res)=>{
 const t=req.params.type
 const page=parseInt(req.query.page||1)
 res.json((db.data[t]||[]).slice((page-1)*20,page*20))
})

app.post("/watch",verify,(req,res)=>{
 db.data.history.push({
  user:req.user.u,
  item:req.body.item
 })
 db.write()
 res.json({ok:true})
})

init().then(()=>{
 const server=http.createServer(app)
 const ws=startWS(server)
 startScheduler(ws)
 server.listen(3000)
})