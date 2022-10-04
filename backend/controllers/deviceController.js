const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const find = require("local-devices");
const Device = require("../models/device");


exports.scanDevices = catchAsyncErrors(async (req, res, next) => {
  var deviceList = {};
  await find().then((devices => {
    deviceList = devices;
    console.log(devices)
  }));
  res.status(200).json({
    success: true,
    message: "Devices found",
    count: deviceList.length,
    devices: deviceList,
  });
});

// add device function
exports.addDevice = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    description,
    type,
    ip,
    mac
  } = req.body;
  const newDevice = await Device.create({
    name,
    description,
    type,
    user: req.user.id,
    ip,
    mac,
  });
  res.status(200).json({
    success: true,
    message: "Device added",
    device: newDevice,
  });
});

// get all Devices function
exports.getDevices = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.find();
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

// get my devices function
exports.getMyDevices = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.find({
    user: req.user.id
  });
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
// get Device settings function
exports.getDeviceSettings = catchAsyncErrors(async (req, res, next) => {
  const device = await Device.findById(req.params.id);
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