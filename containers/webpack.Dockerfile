FROM node:16.13
WORKDIR /usr/src/app/dist/
COPY . /usr/src/app/
RUN npm install
RUN ["npm", "run", "compile-prod"]
RUN ["npm", "run", "build-dev"]
COPY dist /usr/src/app/
EXPOSE 8080
CMD ["npm", "run", "dev:hot"]