import { tweetsData } from "./data.js";

/* Dom Elements */
const tweetInput = document.querySelector("#tweet-input");
const tweetBtn = document.querySelector("#tweet-btn");

/* Event listeners */
tweetBtn.addEventListener("click", () => {});
document.addEventListener("click", handleTweetDetailsClick);

/* Functions */

// grab the tweets uuid based on which tweet detail you clicked on
function targetTweet(t, e) {
  const uuid = e.target.dataset[t];
  return tweetsData.find((tweet) => tweet.uuid === uuid);
}

function incrementLikesAndRetweets(tweet, prop, countProp) {
  // check to see if tweet isLiked or isRetweted
  // increment or decrement accordingly
  tweet[prop] ? tweet[countProp]-- : tweet[countProp]++;
  // flip the isLiked or isRetweeted boolean
  tweet[prop] = !tweet[prop];
}

function handleTweetDetailsClick(e) {

  let updated = false;

  if (e.target.dataset.like) {
    const t = targetTweet("like", e);
    incrementLikesAndRetweets(t, "isLiked", "likes");
    updated = true;
  } 

  else if (e.target.dataset.retweet) {
    const t = targetTweet("retweet", e);
    incrementLikesAndRetweets(t, "isRetweeted", "retweets");
    updated = true;
  } 
  
  else if (e.target.dataset.replies) {
    const t = targetTweet('replies', e);
    if (t.replies.length > 0) {
      document.querySelector(`#replies-${t.uuid}`).classList.toggle('hidden')
    }
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


