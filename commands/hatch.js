const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {


data: new SlashCommandBuilder()

.setName("hatch")

.setDescription("🥚 فقس بيضة التنين"),




async execute(interaction){



let user = await User.findOne({

    userId: interaction.user.id

});



if(!user){

return interaction.reply({

content:"❌ لا يوجد حساب",

ephemeral:true

});

}




if(!user.dragon.hasEgg){


return interaction.reply({

content:
"🥚 لا تملك بيضة تنين",

ephemeral:true

});


}




if(user.dragon.name !== "No Dragon"){


return interaction.reply({

content:
"🐉 لديك تنين بالفعل",

ephemeral:true

});


}





const dragons = [

"🐉 Drogon",

"🐲 Balerion",

"🔥 Vhagar",

"🌑 Night Fury"

];



const dragon =
dragons[Math.floor(Math.random()*dragons.length)];





user.dragon.name = dragon;

user.dragon.level = 1;

user.dragon.power = 50;

user.dragon.hasEgg = false;



await user.save();





const embed = new EmbedBuilder()

.setTitle("🥚 Dragon Hatched!")

.setDescription(`

🔥 مبروك!

لقد فقست بيضتك.

🐉 التنين:
**${dragon}**

⭐ Level: 1

⚡ Power: 50

`)

.setColor("#FF4500");





interaction.reply({

embeds:[embed]

});



}


};