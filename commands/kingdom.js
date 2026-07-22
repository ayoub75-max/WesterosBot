const {SlashCommandBuilder}=require("discord.js");
const User=require("../models/User");

module.exports={

data:new SlashCommandBuilder()
.setName("kingdom")
.setDescription("ترتيب الممالك"),

async execute(interaction){

const users=await User.find()
.sort({
gold:-1
})
.limit(10);


let text="";


users.forEach((u,i)=>{

text+=`${i+1}. 🏰 ${u.house} - ${u.gold} Gold\n`;

});


interaction.reply(
`👑 Seven Kingdoms\n\n${text||"لا يوجد لوردات"}`
);

}

};