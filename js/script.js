import { tweetsData } from './data.js'

/* Dom Elements */
const tweetInput = document.querySelector('#tweet-input')
const tweetBtn = document.querySelector('#tweet-btn')

/* Event listeners */
tweetBtn.addEventListener('click', () => {
  console.log(tweetInput.value)
  tweetInput.value = ''
})
