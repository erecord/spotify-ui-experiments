FROM node:12.18.3-alpine
WORKDIR /usr/src/app

COPY package.json .
RUN yarn

CMD ["yarn", "dev"]