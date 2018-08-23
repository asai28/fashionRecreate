var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var trendSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    link: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    }
});

var Trend = mongoose.model("fashionTrends", trendSchema);

module.exports = Trend;