const {
SlashCommandBuilder,
PermissionFlagsBits
}=require("discord.js");

const User=require("../models/User");


module.exports={


data:new SlashCommandBuilder()

.setName("admin-give")
.setDescription("إضافة Gold أو XP")

.setDefaultMemberPermissions(
PermissionFlagsBits.Administrator
)

.addUserOption(o=>
o.setName("user")
.setDescription("اللاعب")
.setRequired(true)
)

.addStringOption(o=>
o.setName("type")
.setDescription("gold أو xp")
.setRequired(true)
)

.addIntegerOption(o=>
o.setName("amount")
.setDescription("الكمية")
.setRequired(true)
),



async execute(interaction){


const target=interaction.options.getUser("user");
const type=interaction.options.getString("type");
const amount=interaction.options.getInteger("amount");


let user=await User.findOne({
userId:target.id
});


if(!user){

user=await User.create({
userId:target.id,
username:target.username
});

}



if(type==="gold")
user.gold+=amount;


if(type==="xp")
user.xp+=amount;



await user.save();



interaction.reply(
`✅ تمت إضافة ${amount} ${type} إلى ${target.username}`
);


}

};