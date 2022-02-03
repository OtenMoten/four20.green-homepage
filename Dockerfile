FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
#RUN npm install ejs
#RUN npm install express
#RUN npm install ejs-express-layouts
#RUN npm install fontawesome
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]