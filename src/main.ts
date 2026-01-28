import { tweetsData } from "./data/tweetsData";
import { getMultipleElements, getElement } from "./util/getElements";
import type { Tweet } from "./types/types";

const tweetBtn = getElement<HTMLButtonElement>('#tweet-btn')
const tweetInput = getElement<HTMLInputElement>('#tweet-input')
const feed = getElement<HTMLDivElement>('#feed')

tweetBtn.addEventListener('click', ():void => {
  console.log(tweetInput.value)
})

function getFeedHTML(tweetsArr: Tweet[]): void {
  console.log(tweetsArr)
}

getFeedHTML(tweetsData)


