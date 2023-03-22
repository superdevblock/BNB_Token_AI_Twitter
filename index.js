/* ***************************************** Include Library ***************************************** */
require('dotenv').config();

const winston = require('winston');
const colors = require("colors");
const { ethers, JsonRpcProvider } = require('ethers')
const utils = require('ethers').utils;
const BigNumber = require('big-number');
const { HANDSREE_ADDRESS, HANDSREE_ABI, HANDSREE_ADDRESS_AVA, HANDSREE_ABI_AVA } = require('./consts.js');
const { generateAIImage } = require('./ai-generate.js');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: `sale.log` })
    ]
});

function getDateTime() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

async function main() {
    try {
        const   provider = new JsonRpcProvider(process.env.RPC_HTTP_URL_AVA_TEST);
        const   handsreeContract = new ethers.Contract(HANDSREE_ADDRESS_AVA, HANDSREE_ABI_AVA, provider);
        let     log_str;
        let     eventStatus = new Map();

        console.log("Listening Buy Events from Handsree contract...".green);

        handsreeContract.on('eventBought', async (acc, amount) => { // amount is BigInt
            const buyerAddress = acc;
            const boughtAmount = (BigNumber(amount.toString()) / 1e18).toFixed(2);

            if (eventStatus.get(buyerAddress)) { return; }

            ///// Logging /////////////      
            log_str = 'Token Sale Info: ' + buyerAddress + ' ' + boughtAmount;
            logger.info(log_str);
            console.log(log_str.yellow);
            eventStatus.set(buyerAddress, true);
            ///////////////////////////

            ///// Open AI /////////////
            generateAIImage("'" + buyerAddress + "'");
            ///////////////////////////
        });
    } catch(error) {
        console.log('Event Subscribing Error : \n'.red);
        console.log(error);
        process.exit();
    }
}

main();