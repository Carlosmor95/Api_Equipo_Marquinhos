FROM node:19-alpine
WORKDIR /API
COPY package*.json ./API
RUN npm install
CMD [ "npm", "start" ]