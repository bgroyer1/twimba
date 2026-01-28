export type Tweet = {
  handle: string;
  profilePic: string;
  likes: number;
  retweets: number;
  tweetText: string;
  replies: Reply[];
  isLiked: boolean;
  isRetweeted: boolean;
  uuid: string;
}

type Reply = {
  handle: string;
  profilePic: string;
  tweetText: string;
}

/*     {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/troll.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },  */   