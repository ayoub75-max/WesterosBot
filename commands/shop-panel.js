const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("shop-panel")

.setDescription("🛒 فتح متجر Westeros")

.setDefaultMemberPermissions(
    PermissionFlagsBits.Administrator
),



async execute(interaction){



if(!interaction.member.permissions.has(
    PermissionFlagsBits.Administrator
)){


return interaction.reply({

content:"❌ هذا الأمر للأدمن فقط",

ephemeral:true

});


}




const embed = new EmbedBuilder()


.setTitle("🛒 Westeros Market")

.setDescription(`

👑 **Seven Kingdoms Marketplace**

━━━━━━━━━━━━━━

🗡️ **Valyrian Sword**

💰 Price: **500 🪙 Gold**

⚔️ Attack +10


━━━━━━━━━━━━━━


🐉 **Dragon Egg**

💰 Price: **1000 🪙 Gold**

🔥 Unlock Dragon


━━━━━━━━━━━━━━


👑 **Lord Rank**

💰 Price: **5000 🪙 Gold**

⭐ Royal Status


━━━━━━━━━━━━━━


👇 Choose your purchase

`)


.setColor("#FFD700")


.setFooter({

text:"🐉 WesterosBot • Seven Kingdoms"

})


.setTimestamp();





const row = new ActionRowBuilder()

.addComponents(


new ButtonBuilder()

.setCustomId("buy_sword")

.setLabel("🗡️ Sword")

.setStyle(ButtonStyle.Primary),



new ButtonBuilder()

.setCustomId("buy_dragon")

.setLabel("🐉 Dragon Egg")

.setStyle(ButtonStyle.Success),



new ButtonBuilder()

.setCustomId("buy_role")

.setLabel("👑 Lord Rank")

.setStyle(ButtonStyle.Danger)



);





await interaction.reply({

embeds:[embed],

components:[row]

});



}

};