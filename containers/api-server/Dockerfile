FROM node:8

RUN npm install pm2 -g

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD ["pm2-runtime", "server.js"]
