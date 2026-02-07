const Parser=require("rss-parser")
const parser=new Parser()

const feeds={
anime:["https://www.livechart.me/feeds/episodes"],
manga:["https://mdrss.tijlvdb.me/rss?translatedLanguage[]=en"],
manhwa:["https://comick-rss.notaspider.dev/rss?country=kr"]
}

async function fetchFeeds(){

 let r={anime:[],manga:[],manhwa:[]}

 for(const type in feeds){

  for(const url of feeds[type]){
   try{
    const feed=await parser.parseURL(url)
    feed.items.forEach(i=>{
     if(i.categories?.includes("Hentai"))return
     r[type].push({
      title:i.title,
      link:i.link,
      date:i.pubDate||new Date().toISOString()
     })
    })
   }catch{}
  }

 }

 return r
}

module.exports={fetchFeeds}