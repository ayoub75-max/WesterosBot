const { 
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("help")

.setDescription("📜 قائمة أوامر WesterosBot"),




async execute(interaction){



const embed = new EmbedBuilder()

.setTitle("🐉 WesterosBot Commands")

.setDescription(
`
👑 **Seven Kingdoms Guide**

━━━━━━━━━━━━━━

🏰 **Kingdom**

/choosehouse
اختر بيتك في Westeros

/kingdom
عرض معلومات المملكة


━━━━━━━━━━━━━━

🪙 **Economy**

/balance
عرض الذهب

/daily
جمع المكافأة اليومية

/work
العمل وكسب Gold


━━━━━━━━━━━━━━

🐉 **Dragon**

/dragon
عرض التنين

/feed-dragon
🍖 إطعام التنين

/train-dragon
⚔️ تدريب التنين


━━━━━━━━━━━━━━

⚔️ **Battle**

/battle
محاربة لورد آخر


━━━━━━━━━━━━━━

🎒 **Profile**

/profile
عرض بطاقة اللورد


━━━━━━━━━━━━━━

🛒 **Shop**

/shop-panel
فتح متجر Westeros


━━━━━━━━━━━━━━

❄️ Winter is Coming
`
)

.setColor("#8B0000")

.setFooter({
text:"WesterosBot • Seven Kingdoms"
});



await interaction.reply({

embeds:[embed]

});


}


};