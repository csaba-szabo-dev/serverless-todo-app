const fs = require("fs");

const apiUrl = process.argv[2];

const content = `
const CONFIG = {
  API_URL: "${apiUrl}"
};
`;

fs.writeFileSync("../serverless-todo-frontend/config.js", content);

console.log("config.js updated!");