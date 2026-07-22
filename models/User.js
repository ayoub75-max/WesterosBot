const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({


// 🆔 Discord

userId:{
    type:String,
    unique:true,
    required:true
},


username:{
    type:String,
    default:"Unknown"
},





// 🏰 Kingdom

house:{
    type:String,
    default:"No House"
},


rank:{
    type:String,
    default:"Peasant"
},





// 🪙 Economy

gold:{
    type:Number,
    default:100
},


reputation:{
    type:Number,
    default:0
},





// ⭐ Level

level:{
    type:Number,
    default:1
},


xp:{
    type:Number,
    default:0
},





// ⚔️ Combat Stats

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
    default:15
},


battleWins:{
    type:Number,
    default:0
},


battleLosses:{
    type:Number,
    default:0
},






// 🐉 Dragon

dragon:{


name:{
    type:String,
    default:"No Dragon"
},


level:{
    type:Number,
    default:0
},


power:{
    type:Number,
    default:0
},


energy:{
    type:Number,
    default:100
},


hunger:{
    type:Number,
    default:100
},


alive:{
    type:Boolean,
    default:false
}


},








// 🎒 Inventory

inventory:[

{

itemName:{
    type:String,
    default:"Unknown"
},


amount:{
    type:Number,
    default:1
}


}

],







// 🛡️ Equipment


weapon:{
    type:String,
    default:"Wooden Sword"
},


armor:{
    type:String,
    default:"Leather Armor"
},







// ⏳ Cooldowns


lastDaily:{
    type:Date,
    default:null
},


lastWork:{
    type:Date,
    default:null
},


lastBattle:{
    type:Date,
    default:null
},







// 📅 Account

createdAt:{
    type:Date,
    default:Date.now
}



});





module.exports = mongoose.model(
"User",
userSchema
);