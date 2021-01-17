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
 
const faker = require('faker');

exports.lambdaHandler = async (event) => {
    
    const responseBody = {};
    let responseCode = 200;

    if (event.queryStringParameters && event.queryStringParameters.n.match(/^[1-9][0-9]?$|^100$/)) {
        const amount = parseInt(event.queryStringParameters.n);
        const dataList = [];
        for (let i = 0; i < parseInt(amount); i++) {
            dataList.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                prefix: faker.name.prefix(),
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                phone: faker.phone.phoneNumber(),
                jobTItle: faker.name.jobTitle(),
                image: faker.image.avatar(),
            });
        }
        responseBody.data = dataList; 
    } else {
       responseBody.data = {
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           prefix: faker.name.prefix(),
           address: faker.address.streetAddress(),
           city: faker.address.city(),
           phone: faker.phone.phoneNumber(),
           jobTItle: faker.name.jobTitle(),
           image: faker.image.avatar(),
       }
    }
    
    let response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };
    
    return response;
};