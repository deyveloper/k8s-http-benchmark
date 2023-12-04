FROM node:20

WORKDIR /usr/app
COPY ./ /usr/app/

RUN npm i

CMD ["npm", "start"]