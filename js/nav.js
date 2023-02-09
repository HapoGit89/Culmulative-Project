"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);
//Implement Event Listener for Stars which then adds and removes Favorites

$body.on("click", function(e){
  if(e.target.classList.contains("fa-star")){
    if(e.target.classList.contains("far")){
      e.target.classList.remove ("far")
      e.target.classList.add("fa", "solid")}
    else { console.log("hi")
      e.target.classList.add ("far")
      e.target.classList.remove("fa", "solid")}
}});

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
 
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $loginForm.hide();
  $signupForm.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $navAction.show()
}

function toSubmit(){
  $submitForm.show()


}

$submit.on("click", toSubmit)



