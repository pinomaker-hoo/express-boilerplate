# Common build stage
FROM node:16.17.1 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm install -g sequelize-cli

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

RUN sequelize-cli db:migrate

CMD ["npm", "run", "start"]
