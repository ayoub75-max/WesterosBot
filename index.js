const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const fs = require("fs");


// =======================
// 🌐 Render Server
// =======================

const app = express();

app.get("/", (req, res) => {
    res.send("🐉 WesterosBot Online");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("🌐 Web Server Started");
});




// =======================
// 🤖 Discord Client
// =======================

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds
    ]

});





// =======================
// 📂 Load Commands
// =======================

client.commands = new Collection();


const commandFiles = fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));



for (const file of commandFiles) {

    try {

        const command = require(`./commands/${file}`);


        if(command.data){

            client.commands.set(
                command.data.name,
                command
            );

            console.log(`✅ Command Loaded: ${file}`);

        }


    } catch(error){

        console.log(`❌ Error ${file}`);
        console.log(error);

    }

}







// =======================
// ⚔️ Commands + Buttons
// =======================


client.on("interactionCreate", async interaction => {



    // Slash Commands

    if(interaction.isChatInputCommand()){


        const command = client.commands.get(
            interaction.commandName
        );


        if(!command) return;



        try{


            await command.execute(interaction);



        }catch(error){


            console.log(error);


            if(!interaction.replied){

                await interaction.reply({

                    content:"❌ Command Error",

                    ephemeral:true

                });

            }

        }


    }






    // =======================
    // 🛒 SHOP BUTTONS
    // =======================


    if(interaction.isButton()){


        console.log(
            "Button:",
            interaction.customId
        );



        if(interaction.customId === "buy_sword"){


            await interaction.reply({

                content:
                "🗡️ تم شراء **Valyrian Sword**\n⚔️ Attack +10",

                ephemeral:true

            });


            return;

        }




        if(interaction.customId === "buy_dragon"){


            await interaction.reply({

                content:
                "🐉 تم شراء **Dragon Egg**",

                ephemeral:true

            });


            return;

        }




        if(interaction.customId === "buy_role"){


            await interaction.reply({

                content:
                "👑 أصبحت **Lord of Westeros**",

                ephemeral:true

            });


            return;

        }



    }



});








// =======================
// 🗄️ Database + Login
// =======================


async function startBot(){


    try{


        await mongoose.connect(

            process.env.MONGO_URI,

            {
                serverSelectionTimeoutMS:10000
            }

        );


        console.log("🗄️ MongoDB Connected");



        await client.login(

            process.env.TOKEN

        );



    }catch(error){


        console.log("❌ Error:");
        console.log(error.message);


    }


}






client.once("clientReady",()=>{


    console.log(

        `🤖 WesterosBot Online as ${client.user.tag}`

    );


});





startBot();