FROM node

WORKDIR /app

COPY package*.json /

COPY package-lock.json ./


RUN npm install cors body-parser mongoose express nodemon

RUN npm install

COPY --chown=node:node . .

EXPOSE 5000

#RUN npm run build

CMD [ "npm", "start" ]

