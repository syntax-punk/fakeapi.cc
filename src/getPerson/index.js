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

const getFakePerson = () => {
    return(
        { 
            id: faker.random.uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            prefix: faker.name.prefix(),
            address: faker.address.streetAddress(),
            email: faker.internet.email(),
            city: faker.address.city(),
            phone: faker.phone.phoneNumber(),
            jobTItle: faker.name.jobTitle(),
            image: faker.image.avatar(),
        }
    );
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
            dataList.push(getFakePerson());
        }
        responseBody.data = dataList; 
    } else {
       responseBody.data = getFakePerson();
    }
    
    let response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };
    
    return response;
};