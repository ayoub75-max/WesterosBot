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



// 🌐 Render Web Server

const app = express();

app.get("/", (req, res) => {

    res.send("🐉 WesterosBot Online");

});


app.listen(process.env.PORT || 3000, () => {

    console.log("🌐 Web Server Started");

});





// 🤖 Discord Client

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds
    ]

});





// 📂 Commands

client.commands = new Collection();


const commandFiles = fs.readdirSync("./commands")
    .filter(file => file.endsWith(".js"));



for (const file of commandFiles) {

    try {

        const command = require(`./commands/${file}`);


        if (command.data) {

            client.commands.set(
                command.data.name,
                command
            );


            console.log(`✅ Command Loaded: ${file}`);

        }


    } catch(error) {

        console.log(`❌ Error loading ${file}`);
        console.log(error);

    }

}





// ⚔️ Slash Commands + Buttons

client.on("interactionCreate", async interaction => {



    // =====================
    // Slash Commands
    // =====================

    if (interaction.isChatInputCommand()) {


        const command = client.commands.get(
            interaction.commandName
        );


        if (!command) return;



        try {


            await command.execute(interaction);



        } catch(error) {


            console.error(error);


            if(!interaction.replied) {

                await interaction.reply({

                    content:"❌ حدث خطأ أثناء تنفيذ الأمر",

                    ephemeral:true

                });

            }

        }


    }





    // =====================
    // 🛒 Shop Buttons
    // =====================

    if (interaction.isButton()) {



        if(interaction.customId === "buy_sword") {


            await interaction.reply({

                content:
                "🗡️ اشتريت **Valyrian Sword** مقابل 500 🪙 Gold",

                ephemeral:true

            });


        }




        if(interaction.customId === "buy_dragon") {


            await interaction.reply({

                content:
                "🐉 اشتريت **Dragon Egg** مقابل 1000 🪙 Gold",

                ephemeral:true

            });


        }




        if(interaction.customId === "buy_role") {


            await interaction.reply({

                content:
                "👑 حصلت على **Lord Rank** مقابل 5000 🪙 Gold",

                ephemeral:true

            });


        }



    }



});







// 🗄️ MongoDB + Login

async function startBot() {


    try {


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



    } catch(err) {


        console.log("❌ Error:");
        console.log(err.message);


    }


}





client.once("clientReady", () => {


    console.log(

        `🤖 WesterosBot Online as ${client.user.tag}`

    );


});





startBot();