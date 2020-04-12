# WebServer

## Button Layout
1. **Spotify** Random Currated Playlist
2. **YouTube** Random Currated Playlist
3. **Twitch** Next Live User in Currrated List / Else Random YouTube Playlist
4. **Previous** Item in Playlist
5. **Next** Item in Playlist
6. **Adventures in Odyssey** with YouTube Live Background (Needs 3.5 mm Speaker)
7. **Audio Book** with YouTube Live Background
8. **Netflix** ? BlessRNG
9. **Disney+** ? BlessRNG
10. **Pause / Resume**
11. **Stop**
12. **Suffle / Linear**


### https://github.com/balloob/pychromecast/blob/master/pychromecast/controllers/media.py ?

## Rewrite to Happen
### 6 Needs to be Stop
### 7 Needs to Pause / Resume


## Docker Build Command

```
sudo docker build -t alpine-web-server .
```

## Docker Run Command
```
sudo docker run -dit --restart='always' \
-v ~/.config/personal/raspi_chromecast_box.json:/home/.config/personal/raspi_chromecast_box.json \
--network host \
alpine-web-server
```