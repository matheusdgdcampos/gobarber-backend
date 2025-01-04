FROM node:22.12-alpine3.21

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile --ignore-scripts

EXPOSE 3333

CMD [ "yarn", "start:dev" ]
