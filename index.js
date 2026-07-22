const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");


// =====================
// 🌐 Render
// =====================

const app = express();

app.get("/",(req,res)=>{
    res.send("🐉 WesterosBot Online");
});


app.listen(process.env.PORT || 3000,()=>{
    console.log("🌐 Web Server Started");
});




// =====================
// 🤖 Client
// =====================

const client = new Client({

    intents:[
        GatewayIntentBits.Guilds
    ]

});




// =====================
// Commands
// =====================

client.commands = new Collection();



const files = fs.readdirSync("./commands")
.filter(f=>f.endsWith(".js"));



for(const file of files){

try{

const command =
require(`./commands/${file}`);


client.commands.set(
command.data.name,
command
);


console.log(`✅ Loaded ${file}`);


}catch(err){

console.log(
`❌ ${file}`,
err
);

}

}




// =====================
// Interaction Handler
// =====================

require("./handlers/interactionHandler")(client);






// =====================
// Database + Login
// =====================

async function start(){


try{


await mongoose.connect(
process.env.MONGO_URI
);


console.log(
"🗄️ MongoDB Connected"
);



await client.login(
process.env.TOKEN
);



}catch(err){

console.log(err);

}


}



client.once(
"clientReady",
()=>{

console.log(
`🤖 Online ${client.user.tag}`
);

});



start();