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

// Auth form submission functions:
function user_pass_login_form_submit(){
    var username = document.getElementById("user-pass-login-username").value
    var password = document.getElementById("user-pass-login-password").value
    console.log("make some call")

}

// Auth Submission event listeners

document.getElementById("user-pass-login-submit").addEventListener("click", user_pass_login_form_submit)