const mongoose = require('mongoose');
const deviceSettingSchema = new mongoose.Schema({
    gpioMode: {
        type: String,
        required: [true, "Please enter gpio mode"],
        enum: {
            values: [
                "Switch",
                "Analog",
            ],
            message: "Please select correct gpio mode",
        },
    },
    gpioSetting: {
        type: Array,
        required: [true, "Please enter gpioSetting"],
    },
    device: {
        type: mongoose.Schema.ObjectId,
        ref: "Device",
        required: true,
    },
});
module.exports = mongoose.model('DeviceSetting', deviceSettingSchema);