const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {

data: new SlashCommandBuilder()
.setName("give")
.setDescription("إرسال Gold إلى لورد آخر")
.addUserOption(option =>
    option
    .setName("user")
    .setDescription("اللاعب")
    .setRequired(true)
)
.addIntegerOption(option =>
    option
    .setName("amount")
    .setDescription("كمية Gold")
    .setRequired(true)
),


async execute(interaction){


const target = interaction.options.getUser("user");
const amount = interaction.options.getInteger("amount");


if(amount <= 0)
return interaction.reply({
content:"❌ كمية غير صحيحة",
ephemeral:true
});


let sender = await User.findOne({
userId: interaction.user.id
});


if(!sender){
sender = await User.create({
userId: interaction.user.id,
username: interaction.user.username
});
}


if(sender.gold < amount){

return interaction.reply({
content:"❌ لا تملك Gold كافي",
ephemeral:true
});

}



let receiver = await User.findOne({
userId: target.id
});


if(!receiver){

receiver = await User.create({
userId: target.id,
username: target.username
});

}



sender.gold -= amount;
receiver.gold += amount;


await sender.save();
await receiver.save();



const embed = new EmbedBuilder()

.setTitle("💰 Gold Transfer")

.setDescription(
`
👑 ${interaction.user.username}

أرسل إلى:

⚔️ ${target.username}

🪙 Amount:
${amount} Gold
`
)

.setColor("Gold");



interaction.reply({
embeds:[embed]
});


}

};