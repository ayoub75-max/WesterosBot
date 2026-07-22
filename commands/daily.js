const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("احصل على المكافأة اليومية"),


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



        const cooldown = 24 * 60 * 60 * 1000; // 24 ساعة



        if (user.lastDaily) {

            const remaining =
                cooldown - (Date.now() - user.lastDaily.getTime());


            if (remaining > 0) {

                const hours = Math.floor(
                    remaining / (1000 * 60 * 60)
                );


                const minutes = Math.floor(
                    (remaining % (1000 * 60 * 60)) / (1000 * 60)
                );


                return interaction.reply(
                    `⏳ يجب الانتظار **${hours} ساعة و ${minutes} دقيقة** قبل Daily القادم`
                );

            }

        }



        const reward = Math.floor(
            Math.random() * 501
        ) + 500;



        user.gold += reward;

        user.lastDaily = new Date();


        await user.save();



        const embed = new EmbedBuilder()

            .setTitle("👑 مكافأة المملكة اليومية")

            .setDescription(
                `حصلت على:\n\n🪙 **${reward} Gold**`
            )

            .setColor("Gold");



        interaction.reply({
            embeds: [embed]
        });

    }

};