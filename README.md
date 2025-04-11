# pubsub_microservice_app


This project demonstrates a Pub/Sub microservice system using Node.js, MongoDB, Redis, and Docker.

## Architecture Overview

- `receiver-service`: Accepts HTTP POST at `/receiver`, validates & stores in DB, and publishes to Redis.
- `listener-service`: Subscribes to Redis events, transforms & stores data in its own DB.


## Stack

- Node.js (Express)
- MongoDB
- Redis (PubSub)
- Docker / Docker Compose

## Setup Instructions
## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Git
### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pubsub-microservice.git
cd pubsub-microservice

Step 2: Environment Variables
Create .env files in both receiver/ and listener/ folders:

for receiver:
PORT=4000
MONGO_URI=mongodb://localhost:27017/receiverDB
REDIS_HOST=redis
REDIS_PORT=6379

for listener:
MONGO_URI=mongodb://localhost:27017/listenerDB
REDIS_HOST=redis
REDIS_PORT=6379

Step 3: Start the system

docker-compose up --build
Step 3: How test server is running or not , hit below get api
GET http://localhost:4000/
response:"Receiver Service is Running!!!"

Step 4: How to Use
Send Data to /receiver:

POST http://localhost:4000/receiver
Content-Type: application/json

{
  "user": "Harry",
  "class": "Comics",
  "age": 22,
  "email": "harry@potter.com"
}

