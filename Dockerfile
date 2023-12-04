FROM node:20-alpine

WORKDIR /usr/app
COPY ./ /usr/app/

RUN npm i

CMD ["npm", "start"]