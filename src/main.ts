/* ===== Imports ========= */
/* Data */
import { tweetsData } from "./data/tweetsData";
/* Utility */
import { getMultipleElements, getElement } from "./util/getElements";
/* Types */
import type { Tweet } from "./types/types";

/* ===== DOM Elements ===== */
const tweetBtn = getElement<HTMLButtonElement>("#tweet-btn");
const tweetInput = getElement<HTMLInputElement>("#tweet-input");
const feed = getElement<HTMLDivElement>("#feed");

/* ===== Functions ======== */

function getFeedHTML(tweetsArr: Tweet[]): string {
  let feedHTML = "";
  tweetsArr.forEach((tweet) => {
    feedHTML += `
    <div class="tweet"> 
    <div class="tweet-inner">
        <img src="../${tweet.profilePic}" class="profile-pic" alt="Twitter profile of ${tweet.handle}">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                  <i class='fa-solid fa-heart' data-like-tweet="${tweet.uuid}"}></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                  <i class='fa-solid fa-retweet' data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>`;
  });
  return feedHTML;
}

function findTargetTweet(tweetID: string): Tweet | undefined {
  return tweetsData.find((tweet) =>  tweet.uuid === tweetID)
}

function handleLikesAndRetweets(
  tweetID: string,
  booleanKeyName: "isLiked" | "isRetweeted",
  incrementKeyName: "likes" | "retweets" 
): void {

  const targetTweetObj = findTargetTweet(tweetID)

  if (!targetTweetObj) return

  if (!targetTweetObj[booleanKeyName]) {
    targetTweetObj[incrementKeyName]++
  }  
  else {
    targetTweetObj[incrementKeyName]--
  }

  targetTweetObj[booleanKeyName] = !targetTweetObj[booleanKeyName]

  render()
}

function render() {
  feed.innerHTML = getFeedHTML(tweetsData);
}

/* ===== Event Listeners ===== */

tweetBtn.addEventListener("click", (): void => {
  console.log(tweetInput.value);
});

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target instanceof HTMLElement) {
    const data = target.dataset;

    if (data.likeTweet) {
      handleLikesAndRetweets(data.likeTweet, 'isLiked', 'likes');
    } else if (data.retweet) {
      handleLikesAndRetweets(data.retweet, 'isRetweeted', 'retweets')
    }
  }
});

/* ===== Function Calls ===== */

render();
