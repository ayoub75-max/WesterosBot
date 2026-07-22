const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data: new SlashCommandBuilder()

.setName("battle")

.setDescription("⚔️ حارب لورد آخر في Westeros")

.addUserOption(option =>
    option
    .setName("enemy")
    .setDescription("اختر الخصم")
    .setRequired(true)
),



async execute(interaction){


const enemyUser =
interaction.options.getUser("enemy");



if(enemyUser.id === interaction.user.id){

return interaction.reply({

content:"❌ لا يمكنك قتال نفسك",

ephemeral:true

});

}





let player =
await User.findOne({

userId: interaction.user.id

});



if(!player){

player =
await User.create({

userId:interaction.user.id,

username:interaction.user.username

});

}





let enemy =
await User.findOne({

userId:enemyUser.id

});



if(!enemy){

enemy =
await User.create({

userId:enemyUser.id,

username:enemyUser.username

});

}






// حساب القوة

const playerPower =

(player.level * 10)

+

(player.attack || 10)

+

(player.defense || 5)

+

(player.dragon?.power || 0);





const enemyPower =

(enemy.level * 10)

+

(enemy.attack || 10)

+

(enemy.defense || 5)

+

(enemy.dragon?.power || 0);







// فرصة الفوز

const chance =
playerPower /
(playerPower + enemyPower);



const winner =
Math.random() < chance
? player
: enemy;



const loser =
winner === player
? enemy
: player;



// المكافآت

winner.gold += 150;
winner.xp += 30;
winner.reputation += 5;
winner.battleWins++;



loser.gold =
Math.max(0, loser.gold - 100);

loser.xp =
Math.max(0, loser.xp - 10);

loser.reputation =
Math.max(0, loser.reputation - 2);

loser.battleLosses++;





await winner.save();

await loser.save();







const embed =
new EmbedBuilder()

.setTitle(
"⚔️ WESTEROS BATTLE"
)

.setDescription(
`
🔥 **${interaction.user.username}**
⚔️ Power: ${playerPower}


        ⚔️ VS ⚔️


🐉 **${enemyUser.username}**
⚔️ Power: ${enemyPower}


━━━━━━━━━━━━━━


👑 **Winner**
${winner.username}


🎁 **Rewards**

🪙 +150 Gold
⭐ +30 XP
🏅 +5 Reputation


🏆 W:${winner.battleWins}
💀 L:${winner.battleLosses}

❄️ WesterosBot
`
)

.setColor("#8B0000");





await interaction.reply({

embeds:[embed]

});



}


};