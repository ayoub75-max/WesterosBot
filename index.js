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


const User = require("./models/User");



// =======================
// 🌐 Render Web Server
// =======================

const app = express();


app.get("/", (req,res)=>{

    res.send("🐉 WesterosBot Online");

});


app.listen(process.env.PORT || 3000,()=>{

    console.log("🌐 Web Server Started");

});




// =======================
// 🤖 Discord Client
// =======================

const client = new Client({

    intents:[
        GatewayIntentBits.Guilds
    ]

});




// =======================
// 📂 Load Commands
// =======================

client.commands = new Collection();


const commandFiles =
fs.readdirSync("./commands")
.filter(file=>file.endsWith(".js"));



for(const file of commandFiles){

    try{

        const command =
        require(`./commands/${file}`);


        if(command.data){

            client.commands.set(
                command.data.name,
                command
            );


            console.log(
                `✅ Command Loaded: ${file}`
            );

        }


    }catch(error){

        console.log(
            `❌ Error loading ${file}`
        );

        console.log(error);

    }

}






// =======================
// ⚔️ Interaction System
// =======================


client.on("interactionCreate", async interaction=>{



// =======================
// Slash Commands
// =======================


if(interaction.isChatInputCommand()){


    const command =
    client.commands.get(
        interaction.commandName
    );


    if(!command) return;



    try{


        await command.execute(interaction);


    }catch(error){


        console.log(error);


        if(!interaction.replied){


            await interaction.reply({

                content:"❌ حدث خطأ",

                ephemeral:true

            });


        }

    }


    return;

}







// =======================
// 📜 HELP SELECT MENU
// =======================


if(interaction.isStringSelectMenu()){



if(interaction.customId==="help_menu"){


let text="";



switch(interaction.values[0]){


case "kingdom":

text=
`
🏰 **Kingdom**

/choosehouse
اختيار البيت

/kingdom
معلومات المملكة
`;

break;




case "economy":

text=
`
🪙 **Economy**

/balance
عرض الذهب

/daily
المكافأة اليومية

/work
العمل

/give
إرسال الذهب

/inventory
الحقيبة
`;

break;




case "dragons":

text=
`
🐉 **Dragons**

/dragon
معلومات التنين

/hatch
فقس البيضة

/feed-dragon
إطعام التنين

/train-dragon
تدريب التنين
`;

break;




case "combat":

text=
`
⚔️ **Combat**

/battle
قتال اللوردات

/leaderboard
ترتيب اللاعبين
`;

break;




case "profile":

text=
`
👑 **Profile**

/profile
بطاقة اللورد
`;

break;




case "admin":

text=
`
🛡️ **Admin**

/admin-give
إضافة Gold أو XP

/shop-add
إضافة منتج

/shop-panel
فتح المتجر
`;

break;


}




await interaction.reply({

content:text,

ephemeral:true

});


}


return;

}








// =======================
// 🛒 SHOP BUTTONS
// =======================


if(interaction.isButton()){



let user =
await User.findOne({

userId:interaction.user.id

});



if(!user){


user =
await User.create({

userId:interaction.user.id,

username:interaction.user.username

});


}






if(interaction.customId==="buy_sword"){


if(user.gold < 500){


return interaction.reply({

content:"❌ تحتاج 500 Gold",

ephemeral:true

});


}



user.gold -=500;


user.inventory.push({

itemName:"Valyrian Sword",

itemType:"Weapon"

});


await user.save();



return interaction.reply({

content:
"🗡️ اشتريت Valyrian Sword\n⚔️ Attack +10",

ephemeral:true

});


}







if(interaction.customId==="buy_dragon"){


if(user.gold <1000){


return interaction.reply({

content:"❌ تحتاج 1000 Gold",

ephemeral:true

});


}



user.gold -=1000;


user.dragon.hasEgg=true;


await user.save();



return interaction.reply({

content:
"🐉 حصلت على Dragon Egg",

ephemeral:true

});


}







if(interaction.customId==="buy_role"){



if(user.gold <5000){


return interaction.reply({

content:"❌ تحتاج 5000 Gold",

ephemeral:true

});


}



user.gold -=5000;


user.rank="Lord";


await user.save();



return interaction.reply({

content:
"👑 أصبحت Lord of Westeros",

ephemeral:true

});


}


}



});







// =======================
// 🗄️ MongoDB + Login
// =======================


async function startBot(){


try{


await mongoose.connect(

process.env.MONGO_URI,

{

serverSelectionTimeoutMS:10000

}

);



console.log(
"🗄️ MongoDB Connected"
);



await client.login(

process.env.TOKEN

);



}
catch(error){


console.log(
"❌ Error:"
);


console.log(
error.message
);


}


}






client.once("clientReady",()=>{


console.log(

`🤖 WesterosBot Online as ${client.user.tag}`

);


});





startBot();