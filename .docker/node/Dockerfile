FROM node:8-alpine
LABEL mantainer "Atcoin, Inc"

RUN apk update

RUN apk add \
      git \
      g++ \
      gcc \
      libgcc \
      libstdc++ \
      linux-headers \
      make \
      python \
      curl \
      bash && \
      npm install npm@latest -g

# For yarn DNS bug Please delete me when fixed
# https://status.npmjs.org/
RUN echo '104.16.18.35 yarn.npmjs.org' >> /etc/hosts
RUN echo '104.16.23.35 registry.npmjs.org' >> /etc/hosts
RUN yarn install node-sass

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD package.json $APP_HOME

VOLUME $APP_HOME
