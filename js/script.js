/* Imports */
import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const id = uuidv4();
console.log(id)

/* Dom Elements */
const tweetInput = document.querySelector("#tweet-input");
const tweetBtn = document.querySelector("#tweet-btn");

/* Event Listeners */
tweetBtn.addEventListener("click", handleTweetButtonClick);
document.addEventListener("click", handleTweetDetailsClick);

/* Functions */

// grab the tweets uuid based on which tweet detail you clicked on
function handleTweetButtonClick() {
  console.log('hello world')
}

function targetTweet(t, e) {
  const uuid = e.target.dataset[t];
  return tweetsData.find((tweet) => tweet.uuid === uuid);
}

// check to see if tweet isLiked or isRetweted
function incrementLikesAndRetweets(tweet, prop, countProp) {
  // increment or decrement accordingly
  tweet[prop] ? tweet[countProp]-- : tweet[countProp]++;
  // flip the isLiked or isRetweeted boolean
  tweet[prop] = !tweet[prop];
}

// handle clicks on the iframe icons (like, retweet, replies)
function handleTweetDetailsClick(e) {
  let updated = false;

  if (e.target.dataset.like) {
    const t = targetTweet("like", e);
    incrementLikesAndRetweets(t, "isLiked", "likes");
    updated = true;
  } else if (e.target.dataset.retweet) {
    const t = targetTweet("retweet", e);
    incrementLikesAndRetweets(t, "isRetweeted", "retweets");
    updated = true;
  } else if (e.target.dataset.replies) {
    const t = targetTweet("replies", e);
    document.querySelector(`#replies-${t.uuid}`).classList.toggle("hidden");
  }

  if (updated) render();
}

// render the html for the tweet feed
function getFeedHTML(tweet) {
  let feedHTML = "";

  tweet.forEach((tweet) => {
    let repliesHTML = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(
        (reply) =>
          (repliesHTML += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`)
      );
    }

    feedHTML += `
      <div class='tweet'>
        <div class='tweet-inner'>
          <img src='${tweet.profilePic}' class='profile-pic' />
          <div>
            <p class='handle'>${tweet.handle}</p>
            <p class='tweet-text'>${tweet.tweetText}</p>
            <div class='tweet-details'>
              <span class='tweet-detail'>
                <i class="fa-solid fa-comment-dots" aria-label='Show replies' data-replies='${
                  tweet.uuid
                }'></i>
                ${tweet.replies.length}</span>
              <span class='tweet-detail'>
                <i class="fa-solid fa-heart ${
                  tweet.isLiked ? "liked" : ""
                }" aria-label='Like tweet' data-like='${tweet.uuid}'></i>
                ${tweet.likes}
              </span>
              <span class='tweet-detail'>
                <i class="fa-solid fa-retweet ${
                  tweet.isRetweeted ? "retweeted" : ""
                }" aria-label='retweet' data-retweet='${tweet.uuid}'></i>
                ${tweet.retweets}
              </span>
            </div>
          </div>
        </div>
        <div class='hidden' id='replies-${tweet.uuid}'>
            ${repliesHTML}
        </div>
      </div>
    `;
  });
  return feedHTML;
}

// render the tweets to the feed
function render() {
  document.querySelector("#feed").innerHTML = getFeedHTML(tweetsData);
}

/* Function Calls */

render();
