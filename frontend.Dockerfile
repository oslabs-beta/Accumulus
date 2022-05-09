FROM node:16.0

# Meta data
LABEL version="0.1.0"
LABEL description="Accumulus"
LABEL maintainer="Matt Femia mf@mattfemia.com Eric Wu Dan Teng Mark Yencheske Christian Sansovich"

# Create the application directory
RUN mkdir /app

# Use app directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

ARG PORT=8080

# Install the node_modules
RUN npm i -g npm@latest

# Copy modules and all files
COPY . .

# Initialize the webpack build
RUN ["npm", "run", "compile-prod"]
RUN ["npm", "run", "build-prod"]

# Open port 8080
EXPOSE 8080

# Copy to app dir
COPY . /app

# Run the start command to launch the client and server (Check package.json)
CMD ["npm", "run", "start-docker-frontend"]