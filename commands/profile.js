const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data:new SlashCommandBuilder()

.setName("profile")

.setDescription("👑 عرض بطاقة اللورد"),



async execute(interaction){


let target =
interaction.options.getUser("user")
|| interaction.user;



let user =
await User.findOne({

userId: target.id

});



if(!user){


user =
await User.create({

userId:target.id,

username:target.username

});


}





// XP SYSTEM

const maxXP =
user.level * 100;


let xpPercent =
Math.floor(
(user.xp / maxXP) * 10
);



if(xpPercent > 10)
xpPercent = 10;



const xpBar =
"🟩".repeat(xpPercent)
+
"⬜".repeat(10-xpPercent);





// Rank

let rank = "Peasant";


if(user.level >=5)
rank="Knight";


if(user.level >=10)
rank="Lord";


if(user.level >=20)
rank="King";





// Combat Power

const power =
(user.attack || 10)
+
(user.defense || 5)
+
(user.dragon?.power || 0);





// Dragon

let dragonText =
"❌ No Dragon";


if(user.dragon?.name !== "No Dragon"){


dragonText =
`
🐉 ${user.dragon.name}

⭐ Level:
${user.dragon.level}

🔥 Power:
${user.dragon.power}
`;

}







const embed = new EmbedBuilder()


.setAuthor({

name:
`Lord ${target.username}`,

iconURL:
target.displayAvatarURL()

})


.setTitle(
"👑 Westeros Lord Profile"
)



.setThumbnail(
target.displayAvatarURL()
)



.setColor("#8B0000")



.setDescription(

`
🏰 **House**

${user.house}


━━━━━━━━━━━━━━


👑 **Rank**

${rank}


⭐ **Level**

${user.level}



━━━━━━━━━━━━━━


🔥 **Experience**

${xpBar}

${user.xp}/${maxXP} XP


━━━━━━━━━━━━━━


🪙 **Gold**

${user.gold} Dragons



⚔️ **Combat Power**

${power}


🗡️ Attack:
${user.attack || 10}


🛡️ Defense:
${user.defense || 5}



━━━━━━━━━━━━━━


🐉 **Dragon**

${dragonText}



━━━━━━━━━━━━━━


🏆 **Battle Record**


⚔️ Wins:
${user.battleWins}


💀 Losses:
${user.battleLosses}



━━━━━━━━━━━━━━


🎒 **Equipment**


🗡️ ${user.weapon || "Wooden Sword"}


🛡️ ${user.armor || "Leather Armor"}


━━━━━━━━━━━━━━


❄️ Winter is Coming

`

)



.setFooter({

text:
"WesterosBot • Seven Kingdoms"

});




await interaction.reply({

embeds:[embed]

});



}


};