FROM alpine:latest
RUN apk add bash
RUN apk add gcc
RUN apk add python3-dev
RUN apk add musl-dev
RUN apk add libxml2-dev
RUN apk add libxslt-dev
RUN apk add git
RUN apk add nano
RUN apk add nodejs
RUN apk add npm
RUN npm install castnow -g
RUN apk add python3
RUN apk add py3-pip
RUN pip3 install requests
RUN pip3 install pychromecast
RUN pip3 install spotify_token
RUN pip3 install git+https://github.com/plamere/spotipy.git

RUN mkdir /home/.config
RUN mkdir /home/.config/personal

COPY node_app /home/node_app
RUN mkdir /home/node_app/node_moduless
RUN npm install --prefix /home/node_app /home/node_app --save

ENTRYPOINT [ "node" , "/home/node_app/server.js" ]