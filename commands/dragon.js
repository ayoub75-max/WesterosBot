const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const User = require("../models/User");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("dragon")

        .setDescription("عرض معلومات التنين الخاص بك"),



    async execute(interaction) {


        let user = await User.findOne({

            userId: interaction.user.id

        });



        if (!user) {

            return interaction.reply(
                "🏰 اختر بيتك أولاً باستخدام `/choosehouse`"
            );

        }



        if (user.house === "No House") {

            return interaction.reply(
                "🏰 يجب اختيار عائلة أولاً"
            );

        }



        if (!user.dragon || user.dragon.power === 0) {


            return interaction.reply(

                "🥚 لا تملك تنينًا بعد.\nاستخدم نظام البيضة لاحقًا للحصول على تنين."

            );

        }




        const embed = new EmbedBuilder()

            .setTitle("🐉 Dragon of Westeros")

            .setDescription(

`
🔥 الاسم:
**${user.dragon.name}**

⚔️ القوة:
**${user.dragon.power}**

⭐ المستوى:
**${user.dragon.level || 1}**

🏰 البيت:
**${user.house}**
`

            )

            .setColor("Red");



        interaction.reply({

            embeds: [embed]

        });


    }

};