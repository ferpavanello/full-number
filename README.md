# Info

Project developed to challenge CERTI.

# Documentation

This project was made to receive a number (string type) and return the number in full.

**Example:**
- Send: `99999`
- Receive: `noventa e nove mil e novecentos e noventa e nove`

# Dockerfile build

To build image you need to install docker and then execute this command:
- `docker build -t full-number .`

# Execute docker image

To execute the docker image:
- `npm i && docker run -d -p 3333:3333 --name full-number full-number`

# Execute without docker

To execute without docker:
 - `npm i && npm start`

# Execute tests

To execute tests run:
- `npm run test`

# Execute lint

To execute lint run:
- `npm run lint`

# Use the API
To use the API you can open [Postman](https://www.postman.com/) or the platform you like more and make a get to the url:
- http://localhost:3333/99999