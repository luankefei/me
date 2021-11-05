# date: 2021.11.03
# author: luankefei
FROM node:16.13

ENV PORT 3000

# Create app directory
RUN mkdir -p /home/works/www
WORKDIR /home/works/www

# Installing dependencies
# yarn config set registry https://registry.npm.taobao.org
COPY package*.json /home/works/www/
RUN npm install -g cnpm && \
   cnpm install -g pm2 \
   cnpm install -g yarn && yarn

# log
RUN mkdir /home/works/www/logs

# Copying source files
COPY . /home/works/www

# Building app
RUN npm run build
EXPOSE 8846 8847 8848
#CMD ["pm2","start","./prod.json","--no-daemon"]

# Running the app
# CMD ["pm2","start","./$JDIR","--no-daemon"]
CMD "npm" "run" "dev"
