console.log("got here...")
const SHOW = "show"

// Functions to show and hide registration / login modules: ------------------------------------------------------------
function hideAllAuthExpansions(){
    document.getElementById("google-oauth-registration").classList.remove(SHOW)
    document.getElementById("google-oauth-login").classList.remove(SHOW)
    document.getElementById("user-pass-registration").classList.remove(SHOW)
    document.getElementById("user-pass-login").classList.remove(SHOW)
}

function showGoogleAuthRegistration(){
    hideAllAuthExpansions()
    document.getElementById("google-oauth-registration").classList.add(SHOW)
}

function showGoogleAuthLogin(){
    hideAllAuthExpansions()
    document.getElementById("google-oauth-login").classList.add(SHOW)
}

function showUserPassRegistration(){
    hideAllAuthExpansions()
    document.getElementById("user-pass-registration").classList.add(SHOW)
}

function showUserPassLogin(){
    hideAllAuthExpansions()
    document.getElementById("user-pass-login").classList.add(SHOW)
}

// Assign hide/show event listeners : ----------------------------------------------------------------------------------


document.getElementById("register-google-auth-button").addEventListener('click', showGoogleAuthRegistration)
document.getElementById("login-google-auth-button").addEventListener('click', showGoogleAuthLogin)
document.getElementById("register-user-pass-button").addEventListener('click', showUserPassRegistration)
document.getElementById("login-user-pass-button").addEventListener('click', showUserPassLogin)

function getXHRWrapper(endpoint, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(xhttp.responseText)
        }
    };
    xhttp.open("GET", endpoint, true);
    xhttp.send();
}

function postXHRWrapper(endpoint, params, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            console.log("this", this)
            if(this.responseURL){
                window.location = this.responseURL
            }
            callback(xhttp.responseText)
        }
    };
    xhttp.open("POST", endpoint, true);
    xhttp.send(params);
}

// Auth form submission functions:
function user_pass_login_form_submit(){
    var username = document.getElementById("user-pass-login-username").value
    var password = document.getElementById("user-pass-login-password").value
    console.log("make some call")
    var params = {username:username, password:password}
    postXHRWrapper("/login-user-pass", params, function(){console.log("got here 4")})

//login-user-pass
}

// Auth Submission event listeners

document.getElementById("user-pass-login-submit").addEventListener("click", user_pass_login_form_submit)