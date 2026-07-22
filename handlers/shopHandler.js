const User =
require("../models/User");



module.exports = async(interaction)=>{


let user =
await User.findOne({

userId:interaction.user.id

});



if(!user){

user =
await User.create({

userId:interaction.user.id,

username:interaction.user.username

});

}





// Sword

if(
interaction.customId==="buy_sword"
){


if(user.gold < 500)

return interaction.reply({

content:"❌ تحتاج 500 Gold",

ephemeral:true

});



user.gold-=500;


user.inventory.push({

itemName:"Valyrian Sword",

amount:1

});



user.attack +=10;



await user.save();



return interaction.reply({

content:
"🗡️ حصلت على Valyrian Sword\n⚔️ Attack +10",

ephemeral:true

});


}







// Dragon Egg

if(
interaction.customId==="buy_dragon"
){


if(user.gold <1000)

return interaction.reply({

content:"❌ تحتاج 1000 Gold",

ephemeral:true

});



user.gold-=1000;



user.inventory.push({

itemName:"Dragon Egg",

amount:1

});



await user.save();



return interaction.reply({

content:
"🥚 حصلت على Dragon Egg",

ephemeral:true

});


}







// Rank

if(
interaction.customId==="buy_role"
){


if(user.gold <5000)

return interaction.reply({

content:"❌ تحتاج 5000 Gold",

ephemeral:true

});



user.gold-=5000;


user.rank="Lord";


await user.save();



return interaction.reply({

content:
"👑 أصبحت Lord of Westeros",

ephemeral:true

});


}



};