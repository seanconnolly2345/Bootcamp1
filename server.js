var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if (parsedUrl.pathname == '/listings') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(listingData);
    response.end();
    } 
  else {
    response.writeHead(404);
    response.end('Bad gateway error');
  } 
  
};

fs.readFile('listings.json', 'utf8', function(err, data) {
 // if (err) console.log(err);
  listingData = data;
  server = http.createServer(requestHandler);
  server.listen(port, function() {
    console.log('Server listening on: http://localhost:' + port);
  });

  });
