const { 
    SlashCommandBuilder, 
    EmbedBuilder 
} = require("discord.js");

const User = require("../models/User");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("choosehouse")

        .setDescription("اختر عائلتك في Westeros")

        .addStringOption(option =>

            option
            .setName("house")
            .setDescription("اختر البيت")
            .setRequired(true)

            .addChoices(

                {
                    name: "🐺 House Stark",
                    value: "Stark"
                },

                {
                    name: "🐉 House Targaryen",
                    value: "Targaryen"
                },

                {
                    name: "🦁 House Lannister",
                    value: "Lannister"
                },

                {
                    name: "🦌 House Baratheon",
                    value: "Baratheon"
                },

                {
                    name: "⚔️ Night Watch",
                    value: "Night Watch"
                }

            )

        ),



    async execute(interaction) {


        let user = await User.findOne({

            userId: interaction.user.id

        });



        if (!user) {

            user = await User.create({

                userId: interaction.user.id,

                username: interaction.user.username

            });

        }



        if (user.house !== "No House") {


            return interaction.reply({

                content:
                `🏰 أنت بالفعل من **House ${user.house}** ولا يمكنك تغيير البيت.`,

                ephemeral: true

            });


        }




        const house =
        interaction.options.getString("house");



        const bonuses = {


            Stark: {
                xp: 50,
                gold: 200
            },


            Targaryen: {
                xp: 100,
                gold: 100
            },


            Lannister: {
                xp: 30,
                gold: 500
            },


            Baratheon: {
                xp: 70,
                gold: 250
            },


            "Night Watch": {
                xp: 80,
                gold: 150
            }

        };



        user.house = house;

        user.gold += bonuses[house].gold;

        user.xp += bonuses[house].xp;



        await user.save();




        const embed = new EmbedBuilder()


        .setTitle("👑 تم اختيار بيتك")

        .setDescription(

`
🏰 البيت:
**${house}**

🎁 المكافأة:

🪙 +${bonuses[house].gold} Gold

✨ +${bonuses[house].xp} XP
`

        )

        .setColor("Gold");



        interaction.reply({

            embeds:[embed]

        });



    }

};