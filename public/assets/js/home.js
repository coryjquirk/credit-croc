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


});