const express = require("express");
const router = express.Router();
const { scanDevices,addDevice,getDevices,getMyDevices } = require("../controllers/deviceController");
const { getDeviceSettings } = require("../controllers/deviceSettingController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// Device functions
router.route("/devices/scan").get(scanDevices);
router.route("/devices/add").get(isAuthenticatedUser,addDevice);
router.route("/devices/me").get(isAuthenticatedUser,getMyDevices);


router.route("/devices").get(getDevices);

// Device settings functions
router.route("/devices/:id/settings").get(isAuthenticatedUser,getDeviceSettings);


module.exports = router;