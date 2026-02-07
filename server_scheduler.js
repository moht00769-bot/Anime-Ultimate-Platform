const cron=require("node-cron")
const {fetchFeeds}=require("./fetcher")
const {db}=require("./database")

function startScheduler(ws){
 cron.schedule("*/30 * * * *",async()=>{
  const data=await fetchFeeds()
  for(const type in data){
   data[type].forEach(item=>{
    if(!db.data[type].find(x=>x.link===item.link)){
     db.data[type].unshift(item)
     ws.broadcast({type,item})
    }
   })
  }
  await db.write()
 })
}

module.exports={startScheduler}