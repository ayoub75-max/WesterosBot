// =====================
// 🛒 Shop Buttons
// =====================

if (interaction.isButton()) {


    let user = await User.findOne({
        userId: interaction.user.id
    });


    if(!user){

        user = await User.create({

            userId: interaction.user.id,

            username: interaction.user.username

        });

    }




    // 🗡️ Sword

    if(interaction.customId === "buy_sword"){


        if(user.gold < 500){

            return interaction.reply({

                content:"❌ ليس لديك Gold كافي",

                ephemeral:true

            });

        }



        user.gold -= 500;


        user.inventory.push({

            itemName:"Valyrian Sword",

            itemType:"Weapon"

        });


        await user.save();



        return interaction.reply({

            content:
            "🗡️ اشتريت **Valyrian Sword**\n⚔️ تمت إضافته إلى Inventory",

            ephemeral:true

        });


    }





    // 🐉 Dragon Egg

    if(interaction.customId === "buy_dragon"){



        if(user.gold < 1000){


            return interaction.reply({

                content:"❌ ليس لديك Gold كافي",

                ephemeral:true

            });


        }



        user.gold -= 1000;


        user.dragon.hasEgg = true;


        await user.save();



        return interaction.reply({

            content:
            "🐉 حصلت على **Dragon Egg**",

            ephemeral:true

        });



    }





    // 👑 Lord Rank

    if(interaction.customId === "buy_role"){



        if(user.gold < 5000){


            return interaction.reply({

                content:"❌ ليس لديك Gold كافي",

                ephemeral:true

            });


        }



        user.gold -= 5000;


        user.rank = "Lord";


        await user.save();



        return interaction.reply({

            content:
            "👑 أصبحت الآن **Lord of Westeros**",

            ephemeral:true

        });


    }



}