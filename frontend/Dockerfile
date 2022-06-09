FROM node

WORKDIR /frontend

COPY package.*json ./

COPY package-lock.json ./

COPY . /frontend/

RUN npm install
#RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
