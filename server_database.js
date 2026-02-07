const {Low}=require("lowdb")
const {JSONFile}=require("lowdb/node")

const db=new Low(new JSONFile("db.json"))

async function init(){
 await db.read()
 db.data ||= {anime:[],manga:[],manhwa:[],users:[],history:[]}
 await db.write()
}

module.exports={db,init}