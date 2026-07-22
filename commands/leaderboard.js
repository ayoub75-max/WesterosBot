const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data: new SlashCommandBuilder()

.setName("leaderboard")

.setDescription("🏆 ترتيب أقوى لوردات Westeros"),



async execute(interaction){


const users = await User.find()

.sort({
    level:-1,
    battlePower:-1,
    gold:-1
})

.limit(10);



if(users.length === 0){

return interaction.reply({

content:"❌ لا يوجد لاعبين بعد",
ephemeral:true

});

}



let ranking = "";


users.forEach((user,index)=>{


let medal;


if(index === 0) medal="🥇";
else if(index === 1) medal="🥈";
else if(index === 2) medal="🥉";
else medal=`${index+1}.`;



ranking +=
`
${medal} **${user.username}**

👑 ${user.rank}
⭐ Level: ${user.level}
⚔️ Power: ${user.battlePower}
🪙 Gold: ${user.gold}

━━━━━━━━━━━━━━
`;

});




const embed = new EmbedBuilder()

.setTitle("🏆 Seven Kingdoms Leaderboard")

.setDescription(ranking)

.setColor("#FFD700")

.setFooter({

text:"WesterosBot • The Strongest Lords"

});



await interaction.reply({

embeds:[embed]

});


}


};