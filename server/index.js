var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 1234;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  if (request.method === 'POST') {
    request.on('data', function(chunk) {
        var record = JSON.parse(chunk);
        var type = request.url.split('/')[2];
        if (type === 'suggestions.json') {
            fs.readFile(filename, "binary", function(err, file) {
                if(err) {
                    console.log(err)
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                  }
                var records = JSON.parse(file);

                Object.keys(record).forEach(function(key) {
                    var hasUpperCaseLetter = key.match(/[A-Z]/g);

                    if (key === 'group') {
                      record['group_id'] = record.group;
                      delete record.group;
                    } else if (!hasUpperCaseLetter) {
                      item = record;
                    } else {
                      hasUpperCaseLetter.forEach(function(letter) {
                        //var letterPos = key.indexOf(letter);
                        var splitString = key.split(letter);
                        var part1 = splitString[0] + '_';
                        var part2 = letter.toLowerCase() + splitString[1];

                        record[part1 + part2] = record[key];
                        delete record[key];

                      })
                    }
                  })

                //record.id = records.suggestions.length + 1;
                records.suggestions.push(record);


                fs.writeFile(filename, JSON.stringify(records), function(err) {
                    if (err) {
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write(err + "\n");
                        response.end();
                        return;
                    }

                    /*response.writeHead(200);
                    response.write(JSON.stringify(records), "binary");
                    response.end();*/
                    //console.log(uri)
                    fs.readFile(process.cwd() + '/server/suggestion_group.json', "binary", function(err, suggFile) {
                      if (err) {
                        console.log(err);
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write(err + "\n");
                        response.end();
                        return;
                      } else {
                        var groups = JSON.parse(suggFile);
                        groups.suggestion_group.forEach(function(group) {
                          if (group.id === record.group_id) {
                            group.suggestion_ids.push(record.id);
                          }
                        })
                        fs.writeFile(process.cwd() + '/server/suggestion_group.json', JSON.stringify(groups), function(err) {
                          if (err) {
                        console.log(err);
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write(err + "\n");
                        response.end();
                        return;
                      } else {
                          response.writeHead(200);
                          console.log(record)
                          response.write(JSON.stringify(record), "binary");
                          response.end();
                          return;
                        }
                        })
                      }
                    })
                });

            });
        }
    });
  } else if (request.method === 'PUT') {
    request.on('data', function(chunk) {
        var record = JSON.parse(chunk);
        var type = request.url.split('/')[2];
        if (type === 'suggestions') {

            fs.readFile('server/suggestions.json', "binary", function(err, file) {
                if(err) {
                  console.log(err);
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                  }

                var records = JSON.parse(file);

                var updateRecords = records.suggestions.map(function(suggestion) {
                    var item;
                    if (suggestion.id === record.id) {
                        Object.keys(record).forEach(function(key) {
                          var hasUpperCaseLetter = key.match(/[A-Z]/g);
                          console.log(record, key)
                          if (key === 'group') {
                            record.group_id = record.group;
                            delete record.group;

                          } else if (!hasUpperCaseLetter) {

                          } else {
                            hasUpperCaseLetter.forEach(function(letter) {
                              //var letterPos = key.indexOf(letter);
                              var splitString = key.split(letter);
                              var part1 = splitString[0] + '_';
                              var part2 = letter.toLowerCase() + splitString[1];

                              record[part1 + part2] = record[key];
                              delete record[key];

                            })
                          }
                        })
                        item = record;
                    } else {
                        item = suggestion;
                    }
                    return item;

                });

                var newData = {
                    suggestions: updateRecords
                };

                fs.writeFile('server/suggestions.json', JSON.stringify(newData), function(err) {
                    if (err) {
                        console.log(err);
                        response.writeHead(500, {"Content-Type": "text/plain"});
                        response.write(err + "\n");
                        response.end();
                        return;
                    }

                    response.writeHead(204);
                    response.end();
                    return;
                })
            })
        }
    });

  } else {

      path.exists(filename, function(exists) {
        if(!exists) {
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not Found\n");
          response.end();
          return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
          }
          response.writeHead(200);
          response.write(file, "binary");
          response.end();
        });
      });
    }
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");