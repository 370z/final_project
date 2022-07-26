// Using a transpiler
import find from 'local-devices'
// Without using a transpiler
const find = require('local-devices');

// Find all local network devices.
find().then(devices => {
  devices ,
  console.log(devices)
  /*
  [
    { name: '?', ip: '192.168.0.10', mac: '...' },
    { name: '...', ip: '192.168.0.17', mac: '...' },
    { name: '...', ip: '192.168.0.21', mac: '...' },
    { name: '...', ip: '192.168.0.22', mac: '...' }
  ]
  */
})

// Find a single device by ip address.
find('192.168.0.10').then(device => {
  device /*
  {
    name: '?',
    ip: '192.168.0.10',
    mac: '...'
  }
  */
})

// Find all devices within 192.168.0.1 to 192.168.0.25 range
find('192.168.0.1-192.168.0.25').then(devices => {
    devices /*
    [
      { name: '?', ip: '192.168.0.10', mac: '...' },
      { name: '...', ip: '192.168.0.17', mac: '...' },
      { name: '...', ip: '192.168.0.21', mac: '...' },
      { name: '...', ip: '192.168.0.22', mac: '...' }
    ]
    */
})

// Find all devices within /24 subnet range of 192.168.0.x
find('192.168.0.0/24').then(devices => {
    devices /*
    [
      { name: '?', ip: '192.168.0.10', mac: '...' },
      { name: '...', ip: '192.168.0.50', mac: '...' },
      { name: '...', ip: '192.168.0.155', mac: '...' },
      { name: '...', ip: '192.168.0.211', mac: '...' }
    ]
    */
})

// Find all devices without resolving host names (Uses 'arp -an') - this is more performant if hostnames are not needed 
// (This flag is ignored on Windows machines as 'arp -an' is not supported)
find(null, true).then(devices => {
    devices /*
    [
      { name: '?', ip: '192.168.0.10', mac: '...' },
      { name: '?', ip: '192.168.0.50', mac: '...' },
      { name: '?', ip: '192.168.0.155', mac: '...' },
      { name: '?', ip: '192.168.0.211', mac: '...' }
    ]
    */
})



exports.getDevices = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});