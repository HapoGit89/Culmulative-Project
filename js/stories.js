"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let starClass = ''
  let starFav = 'far fa-star'
  if (!currentUser){starClass = "star hidden";
}

if (currentUser && currentUser.favorites.some(function(el){
  return (el.storyId===story.storyId)
})){starFav ='fa solid fa-star'}

 const trashClass='trash-can hidden'

  
  
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <span class="${trashClass}" id="trashcan">
      <i class="fas fa-trash-alt"></i>
    </span>
      <span class="${starClass}">
        <i class="${starFav}" id="star"></i>
      </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    
  

  }

  $allStoriesList.show();
}

$submitButton.on("click", subStory)


async function subStory(evt){
  evt.preventDefault()
  console.log(currentUser)
  const author = $("#author").val()
  const title = $("#title").val()
  const url = $("#url").val()
  let newStory = await storyList.addStory(currentUser,
    {title: `${title}`, author: `${author}`, url: `${url}`});
    await getAndShowStoriesOnStart()
    $submitForm.hide()
    currentUser.ownStories.push(newStory)
  

}

async function delStory(storyId){

  const delStory = await axios({
    url: `https://hack-or-snooze-v3.herokuapp.com/stories/${storyId}`,
    method: "DELETE",
    data: { token: currentUser.loginToken },
  });


currentUser.ownStories = await getUserStories()



}




async function getUserStories(){
  const response = await axios({
    url: `https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.name}?`,
    method: "GET",
    params: { token: currentUser.loginToken },
  })
  return response.data.user.stories
}
