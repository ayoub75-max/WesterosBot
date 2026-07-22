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

const User = require("./models/User");


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

    intents:[
        GatewayIntentBits.Guilds
    ]

});





// =======================
// 📂 Load Commands
// =======================

client.commands = new Collection();


const commandFiles = fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));



for(const file of commandFiles){

    try{

        const command = require(`./commands/${file}`);


        if(command.data){

            client.commands.set(
                command.data.name,
                command
            );


            console.log(`✅ Command Loaded: ${file}`);

        }


    }catch(error){

        console.log(`❌ Error loading ${file}`);
        console.log(error);

    }

}







// =======================
// ⚔️ Commands + Buttons
// =======================

client.on("interactionCreate", async interaction => {



    // ===================
    // Slash Commands
    // ===================


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







    // ===================
    // 🛒 SHOP SYSTEM
    // ===================


    if(interaction.isButton()){


        let user = await User.findOne({

            userId: interaction.user.id

        });



        if(!user){


            user = await User.create({

                userId: interaction.user.id,

                username: interaction.user.username

            });


        }





        // 🗡️ Sword

        if(interaction.customId === "buy_sword"){



            if(user.gold < 500){


                return interaction.reply({

                    content:"❌ تحتاج 500 Gold",

                    ephemeral:true

                });


            }



            user.gold -= 500;



            user.inventory.push({

                itemName:"Valyrian Sword",

                itemType:"Weapon"

            });



            await user.save();



            return interaction.reply({

                content:
                "🗡️ اشتريت **Valyrian Sword**\n⚔️ Attack +10",

                ephemeral:true

            });



        }







        // 🐉 Dragon Egg

        if(interaction.customId === "buy_dragon"){



            if(user.gold < 1000){


                return interaction.reply({

                    content:"❌ تحتاج 1000 Gold",

                    ephemeral:true

                });


            }



            user.gold -= 1000;


            user.dragon.hasEgg = true;



            await user.save();



            return interaction.reply({

                content:
                "🐉 حصلت على **Dragon Egg**",

                ephemeral:true

            });



        }







        // 👑 Lord Rank

        if(interaction.customId === "buy_role"){



            if(user.gold < 5000){


                return interaction.reply({

                    content:"❌ تحتاج 5000 Gold",

                    ephemeral:true

                });


            }



            user.gold -= 5000;


            user.rank = "Lord";



            await user.save();



            return interaction.reply({

                content:
                "👑 أصبحت **Lord of Westeros**",

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