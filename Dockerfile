FROM node:10

LABEL author="Fernando Pavanello"

COPY . /usr/src/full-number

WORKDIR /usr/src/full-number

RUN npm install

EXPOSE 3333

ENTRYPOINT npm start