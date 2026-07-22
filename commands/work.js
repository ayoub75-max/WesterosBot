const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../models/User");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("work")

        .setDescription("اعمل للحصول على الذهب"),



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



        const cooldown = 6 * 60 * 60 * 1000; // 6 ساعات



        if (user.lastWork) {


            const remaining =
                cooldown - (Date.now() - user.lastWork.getTime());



            if (remaining > 0) {


                const hours = Math.floor(

                    remaining / (1000 * 60 * 60)

                );


                const minutes = Math.floor(

                    (remaining % (1000 * 60 * 60)) / (1000 * 60)

                );



                return interaction.reply(

                    `⏳ يمكنك العمل بعد **${hours} ساعة و ${minutes} دقيقة**`

                );

            }

        }




        const reward = Math.floor(

            Math.random() * 301

        ) + 200;



        user.gold += reward;

        user.xp += 20;

        user.lastWork = new Date();



        await user.save();




        const embed = new EmbedBuilder()


            .setTitle("⚔️ عمل في ممالك Westeros")


            .setDescription(

                `حصلت على:\n\n🪙 **${reward} Gold**\n✨ **+20 XP**`

            )


            .setColor("DarkGold");




        interaction.reply({

            embeds: [embed]

        });


    }

};