(function() {
  'use strict';

  var crypto = require('crypto'),

  User = function() {
    var username = "dev080",
        password = "developer",
        id = 27018;

    this.getUsername = function() {
      return username;
    };

    this.getPassword = function() {
      return crypto.createHash("md5").update(password).digest("hex");
    };

    this.getId = function() {
      return id;
    }

  };

  module.exports = new User();

})();