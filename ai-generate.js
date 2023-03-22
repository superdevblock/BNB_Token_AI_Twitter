/* ***************************************** Include Library ***************************************** */
const { Configuration, OpenAIApi } = require("openai");
const fs  = require("fs");
const https = require("https");
const jsonfile = require("jsonfile");
const axios = require("axios");
const colors = require("colors");

const startPosting = require('./twitter-post.js');
const dirImage = './data/images/';
const settingFile = "./data/data.json";
const size = { width: 1024, height: 768 };

const topic = "car";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* *************************** generate AI image *************************** */
async function handlerImage(text) {

  console.log("Start AI Image Generation With Midjourney".green);

  const response = await axios.post(
    "https://api.replicate.com/v1/predictions", 
    {
      version: "436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
      input: { prompt: text }
    },
    { 
      headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`, "Content-Type": "application/json"} 
    }
  );

  return response;
}
/* *************************** get image url *************************** */
async function handlerUrl(id, text) {
  
  console.log("Generating AI Image With Midjourney".green);

  let response = await axios.post(
    "https://api.replicate.com/v1/predictions", 
    {
      version: "436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b",
      input: { prompt: text }
    },
    { 
      headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`, "Content-Type": "application/json"} 
    }
  );

  while (response.data.status !== "succeeded" && response.data !== "failed")
  {
    await sleep(5000);
    response = await axios.get(
      "https://api.replicate.com/v1/predictions/" + id,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  return response.data.output[0];
}

async function generateAIImage (address) {
  if (!configuration.apiKey) { return; }

  try {  
    let images = [], imagesdata = [], imageName, imageIndex;
    let conversation;
    var log_str;

    /* ************************** json access and read ************************** */
    console.log("Data Read Start".green);

    images = jsonfile.readFileSync(settingFile);
    imagesdata = images.imageData;

    // console.log("imagesdata = ", imagesdata);

    if (imagesdata.length == 0)
      imageIndex = 1;
    else
      imageIndex = imagesdata[imagesdata.length - 1][0] + 1;
    imageName = imageIndex + ".png";

    console.log("End Data Read".green);

    /* *************************** OpenAI *************************** */
    console.log("Start AI Text Generation With OpenAI".green);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(topic),
      temperature: 0.6,
      max_tokens: 1024,
      n: 1
    });

    conversation = "mdjrny-v4 " + completion.data.choices[0].text;
    
    log_str = "Chatting with mdjrny-v4 AI engine for your topic... The next is AI sentence for NFT image." + completion.data.choices[0].text;
    console.log(log_str.yellow);
    
    let destPath = dirImage + imageName;
    
    /* *************************** midjourney *************************** */
    const prediction = await handlerImage(conversation);
    const fileUrl = await handlerUrl(prediction.data.id, conversation);
    
    /* *************************** file download *************************** */
    console.log("Start AI Image download".green);

    const fileStream = await fs.createWriteStream(destPath);

    https.get(fileUrl, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          console.log(`File ${destPath} downloaded successfully`.yellow);
        });

        /* ************************** json access and write ************************** */
        console.log("Data Writing Start".green);

        imagesdata.push([imageIndex, address, imageName]);

        images.imageData = imagesdata;
        jsonfile.writeFile(settingFile, images, function (err) {
        });
        console.log("Data Writing End".green);

        //Twitter Posting/////////////////////////
        startPosting(destPath, completion.data.choices[0].text);
        ///////////////////////////////////////
      } else { 
        console.error(`Failed to download file ${fileUrl}: ${response.statusCode}`);
      }
    }).on('error', (error) => { 
      console.error(`Error downloading file ${fileUrl}: ${error.message}`);
    });
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}
/**
 * @abstract This function  
 */
function generatePrompt(topic) {
  return `Can you provide me the best input 1 sentence to generate fantastic word "${topic}" in midjourney?`;
}

module.exports = {
  generateAIImage
}
