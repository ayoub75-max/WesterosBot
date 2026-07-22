const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({


    // 🆔 Discord ID
    userId: {

        type: String,
        unique: true,
        required: true

    },


    username: {

        type: String,
        default: "Unknown"

    },



    // 🏰 House
    house: {

        type: String,
        default: "No House"

    },



    // 🪙 Gold
    gold: {

        type: Number,
        default: 100

    },



    // ⭐ Player Level
    level: {

        type: Number,
        default: 1

    },



    // ✨ XP
    xp: {

        type: Number,
        default: 0

    },



    // 🏅 Reputation
    reputation: {

        type: Number,
        default: 0

    },



    // 🐉 Dragon System
    dragon: {


        name: {

            type: String,
            default: "No Dragon"

        },


        power: {

            type: Number,
            default: 0

        },


        level: {

            type: Number,
            default: 0

        },


        hasEgg: {

            type: Boolean,
            default: false

        }


    },



    // 🎒 Inventory Shop Items
    inventory: [


        {


            itemName: {

                type: String,
                default: "Unknown"

            },


            itemType: {

                type: String,
                default: "Item"

            },


            boughtAt: {

                type: Date,
                default: Date.now

            }


        }


    ],




    // 👑 Discord Roles Purchased
    purchasedRoles: [


        {


            roleId: String,


            guildId: String,


            boughtAt: {

                type: Date,
                default: Date.now

            }


        }


    ],




    // ⚔️ Battle System

    battleWins: {

        type: Number,
        default: 0

    },


    battleLosses: {

        type: Number,
        default: 0

    },



    // 🏰 Kingdom Rank

    rank: {

        type: String,
        default: "Peasant"

    },



    // ⏳ Daily Cooldown

    lastDaily: {

        type: Date,
        default: null

    },



    // ⏳ Work Cooldown

    lastWork: {

        type: Date,
        default: null

    }



});



module.exports = mongoose.model(
    "User",
    userSchema
);