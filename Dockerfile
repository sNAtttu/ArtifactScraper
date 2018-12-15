FROM node:10-slim
WORKDIR /server
COPY . /server
RUN yarn install
RUN yarn compile
EXPOSE 3001
CMD [ "yarn", "start" ]