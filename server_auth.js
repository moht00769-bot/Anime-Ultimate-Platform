const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {db}=require("./database")

const SECRET="ultimate_secret"

async function register(u,p){
 const hash=await bcrypt.hash(p,10)
 db.data.users.push({u,password:hash})
 await db.write()
}

async function login(u,p){
 const user=db.data.users.find(x=>x.u===u)
 if(!user)return null
 const ok=await bcrypt.compare(p,user.password)
 if(!ok)return null
 return jwt.sign({u},SECRET)
}

function verify(req,res,next){
 const t=req.headers.authorization
 if(!t)return res.sendStatus(401)
 try{
  req.user=jwt.verify(t,SECRET)
  next()
 }catch{
  res.sendStatus(403)
 }
}

module.exports={register,login,verify}