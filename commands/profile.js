const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("profile")
        .setDescription("👑 عرض بطاقة اللورد")

        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("عرض ملف لاعب آخر")
            .setRequired(false)
        ),


    async execute(interaction) {


        // اللاعب المطلوب
        const target = 
            interaction.options.getUser("user") 
            || interaction.user;



        let user = await User.findOne({
            userId: target.id
        });



        if(!user){

            user = await User.create({

                userId: target.id,

                username: target.username

            });

        }



        const embed = new EmbedBuilder()

            .setColor("#8B0000")

            .setTitle(`👑 Lord ${target.username}`)

            .setThumbnail(target.displayAvatarURL())

            .addFields(

                {
                    name:"🏰 House",
                    value:user.house || "No House",
                    inline:true
                },

                {
                    name:"🪙 Gold",
                    value:`${user.gold} Dragons`,
                    inline:true
                },

                {
                    name:"⭐ Level",
                    value:`${user.level}`,
                    inline:true
                },

                {
                    name:"🔥 XP",
                    value:`${user.xp}`,
                    inline:true
                },

                {
                    name:"🛡️ Reputation",
                    value:`${user.reputation}`,
                    inline:true
                },

                {
                    name:"🐉 Dragon",
                    value:user.dragon?.name || "No Dragon",
                    inline:true
                },

                {
                    name:"🔥 Dragon Power",
                    value:`${user.dragon?.power || 0}`,
                    inline:true
                }

            )


            .setFooter({

                text:"🐉 WesterosBot • Winter is Coming ❄️"

            })


            .setTimestamp();



        await interaction.reply({

            embeds:[embed]

        });


    }

};