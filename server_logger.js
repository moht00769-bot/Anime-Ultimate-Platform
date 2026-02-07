const fs=require("fs")

function log(msg){
 const line=new Date().toISOString()+" "+msg+"\n"
 fs.appendFileSync("server.log",line)
 console.log(line)
}

module.exports={log}