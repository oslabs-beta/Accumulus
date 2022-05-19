FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN ["npm", "run", "compile-prod"]
RUN ["npm", "run", "build"]
COPY dist /usr/src/app
EXPOSE 3000
CMD ["node", "./dist/server/server.js"]