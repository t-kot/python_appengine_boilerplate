FROM python:3.7-alpine
LABEL mantainer "atcoin-inc"
ENV PATH /google-cloud-sdk/bin:$PATH
ENV CLOUDSDK_PYTHON /usr/bin/python2

RUN apk update

RUN apk add \
      openssl \
      curl \
      gcc \
      git \
      make \
      python \
      unzip \
      py-crcmod \
      bash \
      libc6-compat \
      openssh-client

ENV CLOUD_SDK_VERSION 214.0.0

RUN curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
	tar xzf google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
	rm google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
	ln -s /lib /lib64 && \
	gcloud config set core/disable_usage_reporting true && \
	gcloud config set component_manager/disable_update_check true && \
	gcloud config set metrics/environment github_docker_image && \
	gcloud --version

VOLUME ["/root/.config"]


ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD requirements.txt $APP_HOME
RUN pip install -r requirements.txt

VOLUME $APP_HOME
