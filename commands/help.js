const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("عرض قائمة أوامر WesterosBot"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("🐉 WesterosBot - Seven Kingdoms")
            .setDescription(`
⚔️ **أوامر المملكة**

🏰 **الممالك**
/choosehouse - اختيار البيت
/profile - بطاقة اللورد
/kingdom - ترتيب الممالك

🪙 **الاقتصاد**
/balance - عرض الذهب
/daily - مكافأة يومية
/work - العمل وكسب الذهب

🐉 **التنانين**
/dragon - عرض التنين

⚔️ **الحروب**
/battle - قتال لاعب

🛒 **المتجر**
/shop - فتح المتجر

👑 Winter is Coming ❄️
            `)
            .setFooter({
                text: "WesterosBot"
            });

        await interaction.reply({
            embeds: [embed]
        });
    }
};