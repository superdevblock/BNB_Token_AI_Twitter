// require the `twit` library
require('dotenv').config();
const Twit = require('twit');
const fs = require('fs');

// create a new `Twit` instance with your API keys and access tokens
const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

async function startPosting(imagePath, description) {
  // read the image file and convert it to base64 encoding
  const image_path = "imagePath";
  const b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  // post a tweet with the image and text
  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err) {
      console.log(err);
    } else {
      const media_id = data.media_id_string;
      const tweet = {
        status: description,
        media_ids: [media_id]
      };

      T.post('statuses/update', { status: tweet, hashtag: ['#Handsree AI Token', '#Handsree AI NFT']}, function (err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log('Tweet posted!');
        }
      });
    }
  });
}

module.exports = {
  startPosting
}