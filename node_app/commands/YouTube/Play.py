#!/usr/bin/env python3
import sys
import pychromecast
from pychromecast.controllers.youtube import YouTubeController
import JSONFileOBJDB
from pathlib import Path


OurPersonalDB = JSONFileOBJDB.create({
		"posix_obj": Path( Path.home() , ".config" , "personal" , "chromecast_spotify_personal.json" )
	})

# Change to the video id of the YouTube video
# video id is the last part of the url http://youtube.com/watch?v=video_id
VIDEO_ID = sys.argv[ 1 ]

chromecasts = pychromecast.get_chromecasts()
cast = next(cc for cc in chromecasts if cc.device.friendly_name == OurPersonalDB.self[ "spotify" ][ "chromecast_name" ])
cast.wait()
yt = YouTubeController()
cast.register_handler(yt)
yt.play_video(VIDEO_ID)