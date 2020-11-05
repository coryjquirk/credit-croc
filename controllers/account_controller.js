var express = require("express");

var router = express.Router();

// Import the model (account.js) to use its database functions.
var account = require("../models/account.js");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/home", function(req, res) {
    account.all(function(data) {
        var hbsObject = {
            accounts: data
        };
        console.log(hbsObject);
        res.render("home", hbsObject);
    });
});

router.put("/api/accounts/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    account.update({active: req.body.active}, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.post("/api/accounts", function(req, res) {
    // (cols, vals, cb)
    account.create(["account_name", "balance", "interest", "term_months", "active"], [
        req.body.account_name, req.body.balance, req.body.interest, req.body.term_months, 1],
        function(result) {
        // Send back the ID of the new account
        res.json({ id: result.insertId });
    });
});

router.put("/api/accounts", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    // (cols, vals, cb)
    account.update(["account_name", "balance", "interest", "term_months", "active"], [
        req.body.account_name, req.body.balance, req.body.interest, req.body.term_months, 1],
        function(result) {
        // Send back the ID of the new account
        res.json({ id: result.insertId });
    });
});

router.delete("/api/accounts/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    account.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

// leave this route at the end, redirects 404 error to index
router.get("*", function(req, res) {
    res.render("index");
});

// Borrowed most of above from 13-17 cats app
module.exports = router;