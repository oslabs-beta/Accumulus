FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/dist
RUN npm install
EXPOSE 3000
CMD ["node", "./server/server.js"]