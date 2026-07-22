const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express = require("express");

// Render Web Server
const app = express();

app.get("/", (req, res) => {
    res.send("🐉 WesterosBot Online");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("🌐 Web Server Started");
});


const mongoose = require("mongoose");

const { 
    Client, 
    GatewayIntentBits, 
    Collection 
} = require("discord.js");

const fs = require("fs");


// Discord Client
const client = new Client({

    intents: [
        GatewayIntentBits.Guilds
    ]

});



// تحميل الأوامر
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

    } catch (error) {

        console.log(`❌ Error loading ${file}`);
        console.log(error);

    }

}




// تشغيل Slash Commands

client.on("interactionCreate", async interaction => {


    if (!interaction.isChatInputCommand()) return;


    const command = client.commands.get(
        interaction.commandName
    );


    if (!command) return;


    try {


        await command.execute(interaction);


    } catch (error) {


        console.error(error);


        if (!interaction.replied) {


            await interaction.reply({

                content: "❌ حدث خطأ أثناء تنفيذ الأمر",
                ephemeral: true

            });


        }


    }


});






// تشغيل البوت

async function startBot() {


    try {


        await mongoose.connect(

            process.env.MONGO_URI,

            {
                serverSelectionTimeoutMS: 10000
            }

        );


        console.log("🗄️ MongoDB Connected");



        await client.login(

            process.env.TOKEN

        );



    } catch (err) {


        console.log("❌ Error:");
        console.log(err.message);


    }


}






// Discord.js v15

client.once("clientReady", () => {


    console.log(

        `🤖 WesterosBot Online as ${client.user.tag}`

    );


});





startBot();