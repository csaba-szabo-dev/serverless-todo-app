const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TASKS_TABLE;

exports.handler = async () => {

  try {

    const result = await dynamodb.scan({
      TableName: TABLE_NAME
    }).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
      },
      body: JSON.stringify({
        tasks: result.Items || [],
        nextKey: null
      })
    };

  } catch (error) {

    console.error("DynamoDB error:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        error: "Could not fetch tasks"
      })
    };

  }

};