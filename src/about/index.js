// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
'use strict';

const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    
    let responseCode = 200;
    const content = fs.readFileSync(path.resolve(__dirname, './public/index.html'), { encoding: 'utf-8'});

    let response = {
        statusCode: responseCode,
        headers: {
            "Content-Type": "text/html"
        },
        body: content
    };
    
    return response;
};