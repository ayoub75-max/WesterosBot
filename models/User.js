const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    // 🆔 Discord
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


    // 🪙 Economy
    gold: {
        type: Number,
        default: 100
    },


    // ⭐ Player
    level: {
        type: Number,
        default: 1
    },


    xp: {
        type: Number,
        default: 0
    },


    reputation: {
        type: Number,
        default: 0
    },


    rank: {
        type: String,
        default: "Peasant"
    },



    // ⚔️ Combat

    attack:{
        type:Number,
        default:10
    },


    defense:{
        type:Number,
        default:5
    },


    battlePower:{
        type:Number,
        default:0
    },


    battleWins:{
        type:Number,
        default:0
    },


    battleLosses:{
        type:Number,
        default:0
    },




    // 🐉 Dragon System

    dragon:{


        // اسم التنين

        name:{
            type:String,
            default:"No Dragon"
        },


        // مستوى التنين

        level:{
            type:Number,
            default:0
        },


        // القوة

        power:{
            type:Number,
            default:0
        },


        // هل توجد بيضة

        hasEgg:{
            type:Boolean,
            default:false
        },


        // 🍖 الجوع 0-100

        hunger:{
            type:Number,
            default:100
        },


        // 😴 الطاقة 0-100

        energy:{
            type:Number,
            default:100
        },


        // 🐉 نوع التنين

        type:{
            type:String,
            default:"Unknown"
        }


    },






    // 🎒 Inventory

    inventory:[{


        itemName:{
            type:String,
            default:"Unknown"
        },


        itemType:{
            type:String,
            default:"Item"
        },


        amount:{
            type:Number,
            default:1
        },


        boughtAt:{
            type:Date,
            default:Date.now
        }


    }],






    // 👑 Purchased Roles

    purchasedRoles:[{


        roleId:String,

        guildId:String,


        boughtAt:{
            type:Date,
            default:Date.now
        }


    }],







    // ⏳ Cooldowns

    lastDaily:{
        type:Date,
        default:null
    },


    lastWork:{
        type:Date,
        default:null
    }




});



module.exports = mongoose.model(
    "User",
    userSchema
);