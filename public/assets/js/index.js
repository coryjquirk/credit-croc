$(function() {

    // open login modal
    $(".loginButton").on("click", function(event) {
        event.preventDefault();
        document.getElementById("loginModal").className += ' is-active';
    });

    // login modal login button temp redirect to home - todo login verification
    $(".loginModalButton").on("click", function(event) {
        event.preventDefault();
        window.location.href = "/home";
    });

    // kills any open modal
    $(".modal-background, .close").on("click", function(event) {
        event.preventDefault();
        $(".modal").removeClass("is-active");
    });


});