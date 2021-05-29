# First stage
# Build
FROM node:14.16.1-alpine AS builder

WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Second stage
FROM nginx:1.19-alpine
COPY --from=builder /usr/app/build /usr/share/nginx/html

RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
    
COPY ./nginx.config /etc/nginx/nginx.template


CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]