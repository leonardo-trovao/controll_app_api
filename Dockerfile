FROM node:20.11.0

ENV TZ=GMT+3

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN mkdir -p /etc/sandbox/ssl
# RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/sandbox/ssl/nginx.key -out /etc/sandbox/ssl/nginx.crt -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
