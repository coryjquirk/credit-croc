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

    // open register modal
    $(".registerButton").on("click", function(event) {
        event.preventDefault();
        document.getElementById("registerModal").className += ' is-active';
    });

    // register modal login button temp redirect to home - todo register users setup
    $(".registerModalButton").on("click", function(event) {
        event.preventDefault();
        window.location.href = "/home";
    });

    // kills any open modal
    $(".modal-background, .close").on("click", function(event) {
        event.preventDefault();
        $(".modal").removeClass("is-active");
    });






    // login stuffs
    $(document).ready(function() {
        // Getting references to our form and inputs
        var loginForm = $("form.login");
        var emailInput = $("input#email-input");
        var passwordInput = $("input#password-input");

        // When the form is submitted, we validate there's an email and password entered
        loginForm.on("submit", function(event) {
            event.preventDefault();
            console.log("Login clicked");
            var userData = {
                email: emailInput.val().trim(),
                password: passwordInput.val().trim()
            };

            if (!userData.email || !userData.password) {
                return;
            }

            // If we have an email and password we run the loginUser function and clear the form
            loginUser(userData.email, userData.password);
            emailInput.val("");
            passwordInput.val("");
        });

        // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
        function loginUser(email, password) {
            $.post("/api/login", {
                    email: email,
                    password: password
                })
                .then(function() {
                    window.location.replace("/members");
                    // If there's an error, log the error
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    });
    // ^^^ this should be good to go

    // register stuffs VVV
    $(document).ready(function() {
        // Getting references to our form and input
        var signUpForm = $("form.signup");
        var emailInput = $("input#email-input");
        var passwordInput = $("input#password-input");

        // When the signup button is clicked, we validate the email and password are not blank
        signUpForm.on("submit", function(event) {
            event.preventDefault();
            console.log("Register clicked")
            var userData = {
                email: emailInput.val().trim(),
                password: passwordInput.val().trim()
            };

            if (!userData.email || !userData.password) {
                return;
            }
            // If we have an email and password, run the signUpUser function
            signUpUser(userData.email, userData.password);
            emailInput.val("");
            passwordInput.val("");
        });

        // Does a post to the signup route. If successful, we are redirected to the members page
        // Otherwise we log any errors
        function signUpUser(email, password) {
            $.post("/api/signup", {
                    email: email,
                    password: password
                })
                .then(function(data) {
                    window.location.replace("/members");
                    // If there's an error, handle it by throwing up a bootstrap alert
                })
                .catch(handleLoginErr);
        }

        function handleLoginErr(err) {
            $("#alert .msg").text(err.responseJSON);
            $("#alert").fadeIn(500);
        }
    });





});