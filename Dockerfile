FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN ["npm", "run", "compile-prod"]
RUN ["npm", "run", "build-dev"]
WORKDIR /usr/src/app/dist/
EXPOSE 8080
EXPOSE 3000
CMD ["npm", "run", "dev:hot"]