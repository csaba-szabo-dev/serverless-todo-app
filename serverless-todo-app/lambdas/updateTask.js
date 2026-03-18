const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TASKS_TABLE;

exports.handler = async (event) => {
  try {

    const userId = "demoUser";
    const taskId = event.pathParameters.taskId;
    const createdAt = event.queryStringParameters.createdAt;

    const data = JSON.parse(event.body);

    const updateExpression = [];
    const expressionAttributes = {};

    if (data.title) {
      updateExpression.push("title = :title");
      expressionAttributes[":title"] = data.title;
    }

    if (data.description) {
      updateExpression.push("description = :description");
      expressionAttributes[":description"] = data.description;
    }

    if (data.completed !== undefined) {
      updateExpression.push("completed = :completed");
      expressionAttributes[":completed"] = data.completed;
    }

    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId,
        taskId: taskId
      },
      UpdateExpression: "set " + updateExpression.join(", "),
      ExpressionAttributeValues: expressionAttributes,
      ReturnValues: "ALL_NEW"
    };

    const result = await dynamodb.update(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
      },
      body: JSON.stringify(result.Attributes)
    };

  } catch (error) {

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
      },
      body: JSON.stringify({ error: "Could not update task" })
    };

  }
};