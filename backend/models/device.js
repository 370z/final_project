const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter device name"],
        trim: true,
        maxLength: [100, "Device name cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    type: {
        type: String,
        required: [true, "Please select type for this device"],
        enum: {
            values: [
                "ESP8266",
                "ESP32",
                "Raspberry Pi",
                "Arduino",
                "Other Devices",
            ],
            message: "Please select correct type for this device",
        },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    ip: {
        type: String,
        required: [true, "Please enter ip address"],
    },
    mac: {
        type: String,
        required: [true, "Please enter mac address"],
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Device", deviceSchema);