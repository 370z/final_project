const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Device = require("../models/device");
const DeviceSetting = require("../models/deviceSetting");
const ErrorHandler = require("../utils/errorHandler");

// get Device settings function
exports.getDeviceSettings = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.id)
  const device = await DeviceSetting.find()
    .populate(
      "device"
    );
  if (!device) {
    return next(
      new ErrorHandler(`Device does not found `, 404)
    );
  }
  res.status(200).json({
    success: true,
    device,
  });
});