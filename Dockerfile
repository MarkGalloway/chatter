FROM node:carbon
MAINTAINER Mark Galloway <mark.galloway@ualberta.ca>

COPY package.json /code/
COPY package-lock.json /code/

WORKDIR /code
RUN npm install

ADD . /code
RUN npm run build

EXPOSE 3000
CMD npm run serve
