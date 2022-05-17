FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
ENTRYPOINT ["npm", "run", "kcascade"]
EXPOSE 3000 8080