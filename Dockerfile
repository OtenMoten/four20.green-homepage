FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" 18E48DC6-61F5-4717-BC5D-4A1155A99FA4
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]