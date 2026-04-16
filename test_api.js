const http = require('http');

const data = JSON.stringify({
  items: [{ id: 1, name: 'Burger', price: 10, quantity: 1 }],
  totalAmount: 10
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', chunks));
});

req.on('error', error => {
  console.error('Request Error:', error);
});

req.write(data);
req.end();
