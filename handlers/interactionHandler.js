const helpMenu =
require("./helpMenu");


const shop =
require("./shopHandler");



module.exports = (client)=>{


client.on(
"interactionCreate",
async interaction=>{


// Slash

if(interaction.isChatInputCommand()){


const command =
client.commands.get(
interaction.commandName
);


if(!command) return;


try{

await command.execute(interaction);


}catch(err){

console.log(err);


if(!interaction.replied){

interaction.reply({

content:"❌ Error",

ephemeral:true

});

}


}


}







// Select Menu

if(interaction.isStringSelectMenu()){


await helpMenu(interaction);


}







// Buttons

if(interaction.isButton()){


await shop(interaction);


}



});


};