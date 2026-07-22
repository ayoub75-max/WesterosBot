const {
SlashCommandBuilder,
EmbedBuilder
}=require("discord.js");

const User=require("../models/User");


module.exports={


data:new SlashCommandBuilder()

.setName("inventory")
.setDescription("عرض حقيبة اللورد"),



async execute(interaction){


let user=await User.findOne({
userId:interaction.user.id
});


if(!user){

return interaction.reply({
content:"❌ لا يوجد حساب",
ephemeral:true
});

}



let items = user.inventory.length

? user.inventory.map(i=>`🎒 ${i.itemName} x${i.amount}`).join("\n")

:"فارغة";



const embed=new EmbedBuilder()

.setTitle(`🎒 Inventory - ${interaction.user.username}`)

.setDescription(items)

.setColor("#8B0000");



interaction.reply({
embeds:[embed]
});


}

};