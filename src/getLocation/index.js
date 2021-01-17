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

const getFakeLocation = () => {
    return(
        {
            id: faker.random.uuid(),
            country: faker.address.country(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            location: {
                lat: faker.address.latitude(),
                lng: faker.address.longitude()
            },
            name: faker.company.companyName(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            image: faker.image.business()
        }
    )
}

exports.handler = async (event) => {
    
    const responseBody = {};
    let responseCode = 200;
    if (event.queryStringParameters 
        && event.queryStringParameters.count 
        && event.queryStringParameters.count.match(/^[1-9][0-9]?$|^100$/)) {
        const count = parseInt(event.queryStringParameters.count);
        const dataList = [];
        for (let i = 0; i < count; i++) {
            dataList.push(getFakeLocation());
        }
        responseBody.data = dataList; 
    } else {
       responseBody.data = getFakeLocation();
    }
    
    let response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody),
    };
    
    return response;
};