# client/Dockerfile
FROM node:latest

# Set the working directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Serve with a static server
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
