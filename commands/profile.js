const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("عرض بطاقة اللورد"),

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

        const embed = new EmbedBuilder()
            .setTitle(`⚔️ Lord ${interaction.user.username}`)
            .addFields(
                {
                    name:"🏰 House",
                    value:user.house
                },
                {
                    name:"🪙 Gold",
                    value:`${user.gold} Dragons`
                },
                {
                    name:"⭐ Level",
                    value:`${user.level}`
                },
                {
                    name:"🔥 XP",
                    value:`${user.xp}`
                },
                {
                    name:"🛡️ Reputation",
                    value:`${user.reputation}`
                }
            )
            .setFooter({
                text:"Winter is Coming ❄️"
            });

        interaction.reply({
            embeds:[embed]
        });
    }
};