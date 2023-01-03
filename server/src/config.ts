import dotenv from "dotenv";

dotenv.config();

const USER_ID = process.env.USER_ID;
export const TOKEN = process.env.TWITTER_BEARER_TOKEN;
export const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
export const streamURL = 'https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id';
export const rules = [{ value: `from:${USER_ID}` }]
export const PORT = process.env.PORT || 5000;
