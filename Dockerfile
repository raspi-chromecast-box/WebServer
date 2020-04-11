FROM alpine:latest
RUN apk add bash
RUN apk add nano
RUN apk add nodejs
RUN apk add npm

COPY node_app /home/node_app
RUN npm install /home/node_app --save

ENTRYPOINT [ "/bin/bash" ]


# sudo docker build -t alpine-web-server .

# sudo docker run -it alpine-web-server