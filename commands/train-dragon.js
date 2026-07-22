const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data: new SlashCommandBuilder()

.setName("train-dragon")

.setDescription("🐉 تدريب التنين وزيادة قوته"),




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
"🐉 ليس لديك تنين بعد.\n🥚 قم بفقس البيضة أولاً باستخدام /hatch"

});


}




const cost = 200;



if(user.gold < cost){


return interaction.editReply({

content:
`❌ تحتاج ${cost} Gold لتدريب التنين`

});


}





// دفع التدريب

user.gold -= cost;



// زيادة قوة التنين

user.dragon.power += 10;



// زيادة مستوى التنين كل 100 قوة

if(user.dragon.power % 100 === 0){

    user.dragon.level += 1;

}



// XP اللاعب

user.xp += 20;



await user.save();






const embed = new EmbedBuilder()

.setTitle("🐉 Dragon Training")

.setDescription(`

🔥 تم تدريب تنينك بنجاح!

🐉 التنين:
**${user.dragon.name}**

⚡ القوة:
**${user.dragon.power}**

⭐ المستوى:
**${user.dragon.level}**

✨ XP:
+20

🪙 التكلفة:
${cost} Gold

`)

.setColor("#FF4500");




interaction.editReply({

embeds:[embed]

});


}


};