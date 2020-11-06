$(function() {

    $(document).ready(function() {
        // This file just does a GET request to figure out which user is logged in
        // and updates the HTML on the page
        console.log("Checking logged in user")
        $.get("/api/user_data").then(function(data) {
            $(".member-name").text(data.email);
        });
    });
    $(".activate").on("click", function(event) {
        event.preventDefault();
        console.log("activate CLICKED");
        var id = $(this).data("id");
        var activeState = {
            active: 1
        };
        $.ajax("/api/accounts/" + id, {
            type: "PUT",
            data: activeState
        }).then(function() {
            location.reload();
        });
    });
    $(".deactivate").on("click", function(event) {
        event.preventDefault();
        console.log("deactivate CLICKED");
        var id = $(this).data("id");
        var activeState = {
            active: 0
        };
        $.ajax("/api/accounts/" + id, {
            type: "PUT",
            data: activeState
        }).then(function() {
            location.reload();
        });
    });

    $(".delete-acct").on("click", function(event) {
        var id = $(this).data("id");
        // Send the DELETE request.
        $.ajax("/api/accounts/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("deleted acct", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
    //grabs inputs from newAccount modal
    $("#newAcctSubmit").on("click", function(event) {
        event.preventDefault();
        console.log("NEW ACCOUNT IS CLICKED")
        var newAccount = {
            account_name: $("#newAccountName")
                .val()
                .trim(),
            balance: $("#newBalance")
                .val(),
            interest: $("#newInterest")
                .val(),
            term_months: $("#newTerm")
                .val(),
            active: 1
        };
        if (($("#newTerm").val()) === "") {
            newAccount.term_months = "0"
        }
        console.log(newAccount)
        $.ajax("/api/accounts", {
            type: "POST",
            data: newAccount
        }).then(function() {
            location.reload();
        });
    });

    $(".acctUpdate").on("click", function(event) {
        event.preventDefault();
        console.log("UPDATE ACCT IS CLICKED")
        var updatedAccount = {
            account_name: $("#updateAccountName")
                .val()
                .trim(),
            balance: $("#updateBalance")
                .val(),
            interest: $("#updateInterest")
                .val(),
            term_months: $("#updateTerm")
                .val(),
            active: 1,
            id: this.id
        };
        if (($("#newTerm").val()) === "") {
            updatedAccount.term_months = '0'
        }
        console.log("Term:" + updatedAccount.term_months)
        console.log(updatedAccount)
        $.ajax("/api/accounts", {
            type: "PUT",
            data: updatedAccount
        }).then(function() {
            location.reload();
        });
    });


    // open edit account modal
    $(".edit").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        document.getElementById(id).className += ' is-active';
    });

    // open add account modal
    $("#addAccountLink").on("click", function(event) {
        event.preventDefault();
        document.getElementById("addAccountModal").className += ' is-active';
    });

    // kills any open modal
    $(".modal-background, .close").on("click", function(event) {
        event.preventDefault();
        $(".modal").removeClass("is-active");
    });


    // show/hide charts
    $("#showDebtChart").on("click", function(event) {
        event.preventDefault();
        $("#debtChart").removeClass("hide");
        document.getElementById("feesYrChart").className += ' hide';
    });

    $("#showFeesYrChart").on("click", function(event) {
        event.preventDefault();
        $("#feesYrChart").removeClass("hide");
        document.getElementById("debtChart").className += ' hide';
    });


});