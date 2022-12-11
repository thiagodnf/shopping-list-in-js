var connect = require('connect');
    serveStatic = require('serve-static');
    network = require('network');
	port = process.env.PORT || 3000;
    fs = require('fs');
    recursive = require('recursive-readdir');

connect().use(serveStatic(__dirname)).listen(port);

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

console.log("Running shopping-list");

network.get_active_interface(function(err, obj) {
    console.log('The magic happens at http://localhost:' + port);
    console.log('The magic happens at: '+obj.ip_address+":"+ port);
});
