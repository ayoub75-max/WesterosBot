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
.setDescription("فتح لوحة المتجر (Admin فقط)")
.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),


async execute(interaction){


if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)){
    return interaction.reply({
        content:"❌ هذا الأمر للأدمن فقط",
        ephemeral:true
    });
}


const embed = new EmbedBuilder()

.setTitle("🛒 Westeros Shop")

.setDescription(`
👑 **Seven Kingdoms Market**

━━━━━━━━━━━━━━

🗡️ Valyrian Sword
💰 500 Gold

🐉 Dragon Egg
💰 1000 Gold

👑 Lord Rank
💰 5000 Gold

━━━━━━━━━━━━━━

اختر المنتج للشراء 👇
`)

.setColor("#FFD700")

.setFooter({
text:"WesterosBot • Admin Shop"
});


const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("buy_sword")
.setLabel("🗡️ Sword")
.setStyle(ButtonStyle.Primary),

new ButtonBuilder()
.setCustomId("buy_dragon")
.setLabel("🐉 Dragon")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("buy_role")
.setLabel("👑 Role")
.setStyle(ButtonStyle.Danger)

);


await interaction.reply({
embeds:[embed],
components:[row]
});


}

};