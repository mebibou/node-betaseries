(function() {
  'use strict';

  var crypto = require('crypto'),

  User = function() {
    var username = "dev080",
        password = "developer",
        token = "a93a4d8dd153";

    this.getUsername = function() {
      return username;
    };

    this.getPassword = function() {
      return crypto.createHash("md5").update(password).digest("hex");
    };

    this.getToken = function() {
      return token;
    }

  };

  module.exports = new User();

})();