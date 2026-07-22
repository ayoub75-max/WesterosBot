const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data: new SlashCommandBuilder()

.setName("profile")

.setDescription("عرض بطاقة اللورد")

.addUserOption(option =>
    option
    .setName("user")
    .setDescription("اختيار لورد آخر")
    .setRequired(false)
),



async execute(interaction){


const target =
interaction.options.getUser("user")
|| interaction.user;



let user = await User.findOne({
    userId: target.id
});



if(!user){

user = await User.create({

    userId: target.id,

    username: target.username

});

}



const xpNeed = user.level * 100;


const xpBarLength = 10;


const filled = Math.floor(
(user.xp / xpNeed) * xpBarLength
);


const xpBar =
"🟩".repeat(Math.min(filled,10)) +
"⬛".repeat(Math.max(10-filled,0));




let dragonStatus =
"❌ No Dragon";


if(user.dragon?.alive){

dragonStatus =
`
🐉 ${user.dragon.name}

⭐ Level:
${user.dragon.level}

🔥 Power:
${user.dragon.power}

🍖 Hunger:
${user.dragon.hunger}%

⚡ Energy:
${user.dragon.energy}%
`;

}




const embed = new EmbedBuilder()


.setAuthor({

name:
`Lord ${target.username}`,

iconURL:
target.displayAvatarURL()

})


.setTitle("👑 Westeros Lord Profile")


.setDescription(

`
🏰 **House**
${user.house}


👑 **Rank**
${user.rank}


━━━━━━━━━━━━━━

⭐ **Level**
${user.level}


🔥 **Experience**

${xpBar}

${user.xp}/${xpNeed} XP


━━━━━━━━━━━━━━

🪙 **Gold**
${user.gold} Dragons


⚔️ **Combat Power**
${user.battlePower}


🗡️ Attack:
${user.attack}


🛡️ Defense:
${user.defense}


━━━━━━━━━━━━━━

🐉 **Dragon**

${dragonStatus}


━━━━━━━━━━━━━━

🏆 **Battle Record**

⚔️ Wins:
${user.battleWins}

💀 Losses:
${user.battleLosses}


━━━━━━━━━━━━━━

🗡️ Weapon:
${user.weapon}


🛡️ Armor:
${user.armor}


❄️ Winter is Coming
`

)


.setThumbnail(
target.displayAvatarURL()
)


.setColor("#8B0000")


.setFooter({

text:
"WesterosBot • Seven Kingdoms"

});




await interaction.reply({

embeds:[embed]

});


}


};