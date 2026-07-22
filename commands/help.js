const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");


module.exports = {


data: new SlashCommandBuilder()

.setName("help")

.setDescription("📜 دليل أوامر WesterosBot"),



async execute(interaction){


const commands = [];


// قراءة كل الأوامر

const files = fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));



for(const file of files){


try{


const command = require(`./${file}`);


if(command.data){


commands.push({

name: command.data.name,
description: command.data.description,
category: command.category || "Other"

});


}


}catch(error){}



}





const categories = {


"Kingdom":"🏰 Kingdom",

"Economy":"🪙 Economy",

"Dragons":"🐉 Dragons",

"Combat":"⚔️ Combat",

"Profile":"👤 Profile",

"Shop":"🛒 Shop",

"Admin":"👑 Admin",

"Other":"📜 Other"

};





let text="";



for(const cat in categories){


const list = commands.filter(

cmd=>cmd.category===cat

);



if(list.length){


text +=
`
${categories[cat]}

`;



list.forEach(cmd=>{


text +=
`/${cmd.name} - ${cmd.description}
`;


});


}

}





const embed = new EmbedBuilder()

.setTitle("🐉 WesterosBot Guide")

.setDescription(

`
⚔️ Welcome Lord **${interaction.user.username}**

${text}

━━━━━━━━━━━━━━

❄️ Winter is Coming

`

)

.setColor("#8B0000")

.setFooter({

text:"WesterosBot • Seven Kingdoms"

});



await interaction.reply({

embeds:[embed]

});


}

};