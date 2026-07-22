const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({

    // السيرفر صاحب المتجر
    guildId: {
        type: String,
        required: true
    },

    // اسم المنتج
    name: {
        type: String,
        required: true
    },

    // نوع المنتج
    // role = رتبة Discord
    // item = عنصر عادي
    type: {
        type: String,
        default: "role"
    },

    // السعر بالذهب
    price: {
        type: Number,
        required: true
    },

    // ID الرتبة إذا كان المنتج Role
    roleId: {
        type: String,
        default: null
    }

});

module.exports = mongoose.model("Shop", shopSchema);