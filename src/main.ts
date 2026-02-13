/* ===== Imports ============ */
/* Data */
import { tweetsData } from "./data/tweetsData";
/* Utility */
import { getMultipleElements, getElement } from "./util/getElements";
/* Types */
import type { Tweet } from "./types/types";
import { v4 as uuidv4 } from "uuid";

/* ===== DOM Elements =====-= */
const tweetBtn = getElement<HTMLButtonElement>("#tweet-btn");
const tweetInput = getElement<HTMLInputElement>("#tweet-input");
const feed = getElement<HTMLDivElement>("#feed");

/* ===== Function Calls ===== */

render();

/* ===== Functions ========== */

function getFeedHTML(tweetsArr: Tweet[]): string {
  let feedHTML = "";

  if (!tweetsArr) return "";

  tweetsArr.forEach((tweet) => {
    if (tweet.replies.length > 0) {
      console.log(tweet.uuid);
    }

    let repliesHTML = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach((reply) => {
        repliesHTML += `
              <div class="tweet-reply">
                    <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
      `;
      });
    }

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
                  <i class='fa-solid fa-heart ${tweet.isLiked ? "liked" : ""}'  data-like-tweet="${tweet.uuid}"}></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                  <i class='fa-solid fa-retweet ${tweet.isRetweeted ? "retweeted" : ""}'  data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div id='replies-${tweet.uuid}' class='hidden'>
      ${repliesHTML}
    </div>
</div>`;
  });
  return feedHTML;
}

function findTargetTweet(tweetID: string): Tweet | undefined {
  return tweetsData.find((tweet) => tweet.uuid === tweetID);
}

function handleLikesAndRetweets(
  tweetID: string,
  booleanKeyName: "isLiked" | "isRetweeted",
  incrementKeyName: "likes" | "retweets",
): void {
  const targetTweetObj = findTargetTweet(tweetID);

  if (!targetTweetObj) return;

  if (!targetTweetObj[booleanKeyName]) {
    targetTweetObj[incrementKeyName]++;
  } else {
    targetTweetObj[incrementKeyName]--;
  }

  targetTweetObj[booleanKeyName] = !targetTweetObj[booleanKeyName];

  render();
}

function handleReplyClick(tweetID: string) {
  const targetTweetObj = findTargetTweet(tweetID);
  if (!targetTweetObj) return;
  const repliesDIV = document.querySelector(`#replies-${targetTweetObj?.uuid}`);
  if (targetTweetObj?.replies.length > 0) {
    repliesDIV?.classList.toggle("hidden");
  }
}

function handleTweetBtnClick(tweetText: string) {
  if (tweetText) {
    const newTweetObj: Tweet = {
      handle: `@scrimba`,
      profilePic: `./scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: `${tweetText.trim()}`,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    };
    tweetsData.unshift(newTweetObj);
    console.log(tweetsData);
    render();
  }
  tweetInput.value = ''
}

function render() {
  feed.innerHTML = getFeedHTML(tweetsData);
}

/* ===== Event Listeners ===== */

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target instanceof HTMLElement) {
    const data = target.dataset;

    if (data.likeTweet) {
      handleLikesAndRetweets(data.likeTweet, "isLiked", "likes");
    } else if (data.retweet) {
      handleLikesAndRetweets(data.retweet, "isRetweeted", "retweets");
    } else if (data.reply) {
      handleReplyClick(data.reply);
    } else if (tweetBtn) {
      handleTweetBtnClick(tweetInput.value);
    }
  }
});
