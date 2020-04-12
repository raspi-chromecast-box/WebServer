#!/bin/bash
sudo docker run -dit --restart='always' \
-v ~/.config/personal/raspi_chromecast_box.json:/home/.config/personal/raspi_chromecast_box.json \
--network host \
alpine-web-server