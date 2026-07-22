const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("help")

.setDescription("📜 دليل أوامر WesterosBot"),



async execute(interaction){


const embed = new EmbedBuilder()

.setTitle("🐉 WesterosBot Guide")

.setDescription(
`
**⚔️ Welcome Lord ${interaction.user.username}**

دليل مملكة Westeros

━━━━━━━━━━━━━━

👑 **Kingdom**
🏰 /choosehouse
اختيار البيت

🏰 /kingdom
معلومات المملكة


━━━━━━━━━━━━━━

🪙 **Economy**
💰 /balance
عرض الذهب

🎁 /daily
المكافأة اليومية

⚒️ /work
العمل وكسب الذهب


━━━━━━━━━━━━━━

🐉 **Dragons**
🥚 /hatch
فقس البيضة

🐉 /dragon
معلومات التنين

🍖 /feed-dragon
إطعام التنين

⚔️ /train-dragon
تدريب التنين


━━━━━━━━━━━━━━

⚔️ **Combat**
⚔️ /battle
قتال لورد آخر


━━━━━━━━━━━━━━

🎒 **Profile**
👤 /profile
بطاقة اللورد


━━━━━━━━━━━━━━

🛒 **Shop**
🛒 /shop-panel
متجر المملكة


❄️ Winter is Coming
`
)

.setColor("#8B0000")

.setThumbnail(
interaction.client.user.displayAvatarURL()
)

.setFooter({
text:"WesterosBot • Seven Kingdoms"
});



const buttons = new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId("help_economy")

.setLabel("🪙 Economy")

.setStyle(ButtonStyle.Primary),


new ButtonBuilder()

.setCustomId("help_dragon")

.setLabel("🐉 Dragons")

.setStyle(ButtonStyle.Success),


new ButtonBuilder()

.setCustomId("help_battle")

.setLabel("⚔️ Battle")

.setStyle(ButtonStyle.Danger)

);



await interaction.reply({

embeds:[embed],

components:[buttons]

});


}

};