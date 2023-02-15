const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    refreshToken: {type: String, require: true},
})

module.exports.TokenModel = model('token', TokenSchema);
