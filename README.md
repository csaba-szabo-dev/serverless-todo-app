# Serverless Todo App

A full-stack serverless todo application built with AWS.

## 🚀 Features

* Create, update, and delete tasks
* Mark tasks as completed
* Persistent storage with DynamoDB
* Serverless backend using AWS Lambda

## 🛠 Tech Stack

* AWS Lambda
* API Gateway
* DynamoDB
* Node.js
* Vanilla JavaScript (frontend)

## 📁 Project Structure

* `serverless-todo-app/` → Backend (Lambda functions, Serverless config)
* `serverless-todo-frontend/` → Frontend (HTML, JS)

## ⚙️ Setup

### Backend

```bash
cd serverless-todo-app
npm install
serverless deploy
```

### Frontend

Open `index.html` in your browser

## 📌 Notes

* Currently uses a demo user (no authentication yet)
* Future improvements: Cognito authentication, better sorting, pagination

## 🌍 Live API

API Gateway endpoint is configured in `config.js`

---

## 📈 Future Improvements

* Add user authentication with AWS Cognito
* Improve database query performance
* Enhance UI/UX
