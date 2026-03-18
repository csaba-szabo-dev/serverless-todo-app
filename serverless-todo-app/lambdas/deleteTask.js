const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TASKS_TABLE;

exports.handler = async (event) => {
  try {

    const userId = "demoUser";
    const taskId = event.pathParameters.taskId;
    

    await dynamodb.delete({
  TableName: TABLE_NAME,
  Key: {
    userId: userId,
    taskId: taskId
  }
}).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
      },
      body: JSON.stringify({ message: "Task deleted successfully" })
    };

  } catch (error) {

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
      },
      body: JSON.stringify({ error: "Could not delete task" })
    };

  }
};