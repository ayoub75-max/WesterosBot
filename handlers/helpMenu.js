module.exports = async(interaction)=>{


if(
interaction.customId !== "help_menu"
)return;



let text="";



switch(
interaction.values[0]
){



case "economy":

text=`
🪙 **Economy**

/balance
/daily
/work
/give
/inventory
`;

break;



case "dragon":

text=`
🐉 **Dragons**

/dragon
/hatch
/feed-dragon
/train-dragon
`;

break;



case "combat":

text=`
⚔️ **Combat**

/battle
/leaderboard
`;

break;



case "kingdom":

text=`
🏰 **Kingdom**

/choosehouse
/kingdom
`;

break;



case "admin":

text=`
🛡️ **Admin**

/admin-give
/shop-add
/shop-panel
`;

break;


}



await interaction.reply({

content:text,

ephemeral:true

});


};