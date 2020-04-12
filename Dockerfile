FROM alpine:latest
RUN apk add bash
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

COPY node_app /home/node_app
RUN npm install -p /home/node_app /home/node_app --save

ENTRYPOINT [ "node" , "/home/node_app/server.js" ]