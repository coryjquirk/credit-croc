// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var account = {
    all: function(cb) {
        orm.all("accounts", function(res) {
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("accounts", objColVals, condition, function(res) {
            cb(res);
        });
    },
    create: function(cols, vals, cb) {
        orm.create("accounts", cols, vals, function(res) {
            cb(res);
        });
    },
    delete: function(condition, cb) {
    orm.delete("accounts", condition, function(res) {
        cb(res);
    });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = account;