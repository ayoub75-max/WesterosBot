const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
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
⚔️ Welcome Lord **${interaction.user.username}**

اختر قسم الأوامر من القائمة 👇

━━━━━━━━━━━━━━

👑 Seven Kingdoms
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



const menu = new StringSelectMenuBuilder()

.setCustomId("help_menu")

.setPlaceholder("📜 اختر قسم الأوامر")

.addOptions([


{
label:"Kingdom",
description:"🏰 البيوت والمملكة",
emoji:"🏰",
value:"kingdom"
},


{
label:"Economy",
description:"🪙 الذهب والعمل",
emoji:"🪙",
value:"economy"
},


{
label:"Dragons",
description:"🐉 نظام التنانين",
emoji:"🐉",
value:"dragons"
},


{
label:"Combat",
description:"⚔️ القتال والترتيب",
emoji:"⚔️",
value:"combat"
},


{
label:"Profile",
description:"👤 بطاقة اللورد",
emoji:"🎒",
value:"profile"
},


{
label:"Shop",
description:"🛒 المتجر",
emoji:"🛒",
value:"shop"
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