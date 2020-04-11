FROM alpine:latest
RUN apk add bash
RUN apk add nano
RUN apk add nodejs

COPY node_app /home/

ENTRYPOINT [ "/bin/bash" ]


# sudo docker build -t alpine-web-server .

#sudo docker run -it \
#--privileged -v /dev/input/:/dev/input/ \
#alpine-alpine-web-server