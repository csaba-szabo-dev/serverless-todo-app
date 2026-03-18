const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TASKS_TABLE;

exports.handler = async (event) => {
  try {

    const data = JSON.parse(event.body);

    const task = {
      userId: "demoUser",
      taskId: uuidv4(),
      title: data.title,
      description: data.description || "",
      completed: false,
      createdAt: new Date().toISOString()
    };

    await dynamodb.put({
      TableName: TABLE_NAME,
      Item: task
    }).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
      },
      body: JSON.stringify(task)
    };

  } catch (error) {

    console.error(error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: "Could not create task" })
    };

  }
};