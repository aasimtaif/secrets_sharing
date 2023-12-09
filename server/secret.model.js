const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
    secret: { type: String, required: false },
    visitesAllowed: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now() },
    validTill: { type: Date, expires: 0 }
},);
yourSchema.index({ "expire_at": 1 }, { expireAfterSeconds: 0 });
const YourModel = mongoose.model('YourModel', yourSchema);

module.exports = YourModel;
