const {SlashCommandBuilder}=require("discord.js");

module.exports={

data:new SlashCommandBuilder()
.setName("battle")
.setDescription("حارب لورد آخر")
.addUserOption(option=>
option
.setName("enemy")
.setDescription("الخصم")
.setRequired(true)
),

async execute(interaction){

const enemy=
interaction.options.getUser("enemy");


const winner=
Math.random()>0.5
?interaction.user
:enemy;


interaction.reply(
`⚔️ Battle of Westeros!\n\n🏆 Winner: ${winner.username}`
);

}

};