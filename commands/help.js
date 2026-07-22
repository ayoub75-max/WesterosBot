const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("help")

.setDescription("📜 دليل WesterosBot"),



async execute(interaction){


const embed = new EmbedBuilder()

.setTitle("🐉 WesterosBot Guide")

.setDescription(
`
⚔️ Welcome Lord **${interaction.user.username}**

📜 اختر قسم الأوامر من القائمة 👇

━━━━━━━━━━━━━━

👑 Seven Kingdoms
❄️ Winter is Coming
`
)

.setColor("#8B0000")

.setFooter({

text:"WesterosBot • Seven Kingdoms"

});



const menu = new StringSelectMenuBuilder()

.setCustomId("help_menu")

.setPlaceholder("📜 اختر القسم")

.addOptions([

{
label:"Kingdom",
emoji:"🏰",
description:"البيوت والمملكة",
value:"kingdom"
},

{
label:"Economy",
emoji:"🪙",
description:"الذهب والاقتصاد",
value:"economy"
},

{
label:"Dragons",
emoji:"🐉",
description:"نظام التنانين",
value:"dragons"
},

{
label:"Combat",
emoji:"⚔️",
description:"الحروب والمعارك",
value:"combat"
},

{
label:"Profile",
emoji:"👑",
description:"ملف اللورد",
value:"profile"
},

{
label:"Admin",
emoji:"🛡️",
description:"أوامر الإدارة",
value:"admin"
}

]);



const row = new ActionRowBuilder()

.addComponents(menu);



await interaction.reply({

embeds:[embed],

components:[row]

});


}


};