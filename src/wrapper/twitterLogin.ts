import Twitter from 'twitter-lite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY!,
  consumer_secret: process.env.TWITTER_API_SECRET!,
});

// client
//   .getRequestToken(process.env.TWITTER_API_CALLBACK!)
//   .then(res => console.log(res))
//   .catch(console.error);

const oauthVerifier = 'XtsoO8qLPEQ1DNoAosj96pa5YwLqviJ8';
const oauthToken = 'UjUVsAAAAAABDVplAAABetwJRDA';

client
  .getAccessToken({
    oauth_verifier: oauthVerifier,
    oauth_token: oauthToken,
  })
  .then(res =>
    console.log({
      accTkn: res.oauth_token,
      accTknSecret: res.oauth_token_secret,
      userId: res.user_id,
      screenName: res.screen_name,
    })
  )
  .catch(console.error);
