var http = require("http");

var options = {
  host: 'http://203.247.240.226:8080/fhir/Patient/sisi234567',
  port: 8080,
  path: '/fhir/Patient/sisi234567',
  method: 'PUT'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();