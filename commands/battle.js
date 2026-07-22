const { 
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data: new SlashCommandBuilder()

.setName("battle")
.setDescription("⚔️ حارب لورد آخر في ويستروس")

.addUserOption(option =>
    option
    .setName("enemy")
    .setDescription("اختر خصمك")
    .setRequired(true)
),



async execute(interaction){


    const enemy = interaction.options.getUser("enemy");



    if(enemy.id === interaction.user.id){

        return interaction.reply({
            content:"❌ لا يمكنك محاربة نفسك",
            ephemeral:true
        });

    }



    let player = await User.findOne({
        userId: interaction.user.id
    });



    let opponent = await User.findOne({
        userId: enemy.id
    });





    if(!player){

        player = await User.create({

            userId: interaction.user.id,
            username: interaction.user.username

        });

    }





    if(!opponent){

        opponent = await User.create({

            userId: enemy.id,
            username: enemy.username

        });

    }






    // ⚔️ حساب القوة

    const playerPower =

        (player.level * 10) +

        player.dragon.power +

        Math.floor(Math.random() * 50);




    const enemyPower =

        (opponent.level * 10) +

        opponent.dragon.power +

        Math.floor(Math.random() * 50);






    let winner;
    let loser;

    let winnerUser;
    let loserUser;





    if(playerPower >= enemyPower){


        winner = player;
        loser = opponent;

        winnerUser = interaction.user;
        loserUser = enemy;



    }else{


        winner = opponent;
        loser = player;

        winnerUser = enemy;
        loserUser = interaction.user;


    }





    // 👑 جوائز الفائز

    winner.gold += 150;
    winner.xp += 30;
    winner.reputation += 5;





    // 💀 خسائر الخاسر

    loser.gold = Math.max(0, loser.gold - 100);

    loser.xp = Math.max(0, loser.xp - 10);

    loser.reputation = Math.max(0, loser.reputation - 2);





    await winner.save();

    await loser.save();







    const embed = new EmbedBuilder()

    .setColor("#8B0000")

    .setTitle("⚔️ Battle of Westeros")

    .setDescription(
`
🏰 **${interaction.user}**
🔥 Power: **${playerPower}**

⚔️ VS ⚔️

🐉 **${enemy}**
🔥 Power: **${enemyPower}**


👑 **Winner**
${winnerUser}


💀 **Defeated**
${loserUser}


━━━━━━━━━━━━━━

🏆 Winner Rewards

🪙 +150 Gold
⭐ +30 XP
🏅 +5 Reputation


💀 Loser Penalty

🪙 -100 Gold
⭐ -10 XP
🏅 -2 Reputation
`
)


.setFooter({

text:"House Wars • WesterosBot"

})

.setTimestamp();





await interaction.reply({

    content:`⚔️ ${interaction.user} challenged ${enemy}`,

    embeds:[embed]

});



}


};