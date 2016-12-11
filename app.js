var connect = require('connect');
    serveStatic = require('serve-static');
    network = require('network');
	port = process.env.PORT || 8080;
    fs = require('fs');
    recursive = require('recursive-readdir');

connect().use(serveStatic(__dirname)).listen(port);

recursive('./', ['.git','node_modules','.editorconfig','.gitignore','app.js','cache.appcache','LICENSE','package.json','README.md','update-gh-pages.sh'], function (err, files) {
    //all = all.concat(files);

    var stream = fs.createWriteStream("cache.appcache");
    stream.once('open', function(fd) {
        stream.write("CACHE MANIFEST \n");
        stream.write("# Timestamp "+new Date().getTime()+"\n");

        stream.write("\n");

        for(var i = 0; i < files.length; i++){
            stream.write((files[i].replace(/\\/g,'/')) +" \n");
        }

        stream.write("\n");
        stream.write("NETWORK: \n");
        stream.write("* \n");

        stream.end();
    });
});

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

console.log("Running shopping-list");

network.get_active_interface(function(err, obj) {
    console.log('The magic happens at http://localhost:' + port);
    console.log('The magic happens at: '+obj.ip_address+":"+ port);
});
