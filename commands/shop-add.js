const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const Shop = require("../models/Shop");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("shop-add")
        .setDescription("إضافة منتج إلى متجر السيرفر")

        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("اسم المنتج")
                .setRequired(true)
        )

        .addIntegerOption(option =>
            option
                .setName("price")
                .setDescription("السعر بالذهب")
                .setRequired(true)
        )

        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("الرتبة التي سيحصل عليها المشتري")
                .setRequired(true)
        )

        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        ),


    async execute(interaction) {


        const name =
            interaction.options.getString("name");


        const price =
            interaction.options.getInteger("price");


        const role =
            interaction.options.getRole("role");



        const product = await Shop.create({

            guildId: interaction.guild.id,

            name: name,

            type: "role",

            price: price,

            roleId: role.id

        });



        await interaction.reply({

            content:
            `✅ تم إضافة المنتج إلى المتجر!\n\n` +

            `🏷️ المنتج: **${product.name}**\n` +

            `🪙 السعر: **${product.price} Gold**\n` +

            `👑 الرتبة: ${role}`

        });


    }

};