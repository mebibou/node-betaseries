'use strict';

var client = {};

function buildClient() {
  [ 'auth', 'episodes', 'shows' ]
    .forEach(function (path) {
        var modules = require('./' + path);
        for (var i in modules) {
          client[i] = modules[i](client);
        }
    });
}

function Betaseries(apiKey) {
    client.apiKey = apiKey;

    buildClient();
    
    return client;
}

module.exports = Betaseries;