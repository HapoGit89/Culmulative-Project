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

$body.on("click", function(e){
  if (e.target.classList.contains("fa-trash-alt")){
    $(e.target.parentElement.parentElement).remove()
    delStory(e.target.parentElement.parentElement.id)
    

  }
})

$body.on("click", async function(e){
  if(e.target.classList.contains("fa-star")){
    if(e.target.classList.contains("far")){
      e.target.classList.remove ("far")
      e.target.classList.add("fa", "solid")
    await addFav(e.target.parentElement.parentElement.id)}
    else {
      e.target.classList.add ("far")
      e.target.classList.remove("fa", "solid")
    await removeFav(e.target.parentElement.parentElement.id)}
}});

$favorites.on("click", function(){
for (let story of $allStoriesList.children()){
 
  if (!currentUser.favorites.some((el)=>{return (el.storyId===story.id) }))
  {$(`#${story.id}`).hide()}
}
})

$ownStories.on("click", function(){
  for (let story of $allStoriesList.children()){
    if (!currentUser.ownStories.some((el)=>{return (el.storyId===story.id) }))
    {$(`#${story.id}`).hide()}
    $(story.children[0]).show()
  }
  
})

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
 
}

$cancelButton.on("click", (e)=>{ $submitForm.hide()})

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
  putStoriesOnPage()

}

function toSubmit(){
  $submitForm.show()


}

$submit.on("click", toSubmit)

$mainlogo.on("click", ()=>{
  
  getAndShowStoriesOnStart()
})



