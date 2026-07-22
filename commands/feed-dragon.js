const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data: new SlashCommandBuilder()

.setName("feed-dragon")

.setDescription("🍖 إطعام التنين وزيادة قوته"),




async execute(interaction){


await interaction.deferReply();



let user = await User.findOne({

    userId: interaction.user.id

});



if(!user){

return interaction.editReply({

content:"❌ لا يوجد حساب"

});

}




if(
!user.dragon ||
user.dragon.name === "No Dragon"
){


return interaction.editReply({

content:
"🐉 لا تملك تنيناً.\n🥚 احصل على بيضة وافقسها أولاً."

});

}





const foodCost = 100;



if(user.gold < foodCost){


return interaction.editReply({

content:
`❌ تحتاج ${foodCost} Gold لإطعام التنين`

});

}





// دفع الطعام

user.gold -= foodCost;


// زيادة قوة التنين

const powerGain = Math.floor(
Math.random() * 10
) + 5;


user.dragon.power += powerGain;


// XP

user.xp += 10;



await user.save();





const embed = new EmbedBuilder()

.setTitle("🍖 Dragon Feeding")

.setDescription(`

🐉 تم إطعام تنينك!

🔥 التنين:
**${user.dragon.name}**

⚡ القوة:
+${powerGain}

💪 القوة الحالية:
**${user.dragon.power}**

✨ XP:
+10

🪙 التكلفة:
${foodCost} Gold

`)

.setColor("#8B4513");





interaction.editReply({

embeds:[embed]

});


}


};