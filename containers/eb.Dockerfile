FROM node:16.13
RUN npm install -g webpack
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN ["npm", "run", "compile-prod"]
RUN ["npm", "run", "build-dev"]
COPY dist /usr/src/app/
EXPOSE 8080