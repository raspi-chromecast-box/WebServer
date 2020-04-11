#!/usr/bin/env python3

#import http.client as http_client
#import logging
import time
import os
import sys
import JSONFileOBJDB
from pathlib import Path

import pychromecast
from pychromecast import Chromecast
from pychromecast.controllers.spotify import SpotifyController
import spotify_token as st
import spotipy

OurPersonalDB = JSONFileOBJDB.create({
		"posix_obj": Path( Path.home() , ".config" , "personal" , "chromecast_spotify_personal.json" )
	})

OurSpotifyTokenDB = JSONFileOBJDB.create({
		"posix_obj": Path( Path.home() , ".config" , "personal" , "chromecast_spotify_token.json" )
	})

def GenerateSpotifyToken():
	print( "Generating Spotify Token" )
	data = st.start_session( OurPersonalDB.self[ "spotify" ][ "username" ] , OurPersonalDB.self[ "spotify" ][ "password" ] )
	access_token = data[ 0 ]
	seconds_left = data[ 1 ] - int( time.time() )
	OurSpotifyTokenDB.self[ "access_token" ] = access_token
	OurSpotifyTokenDB.self[ "expire_time" ] = data[ 1 ]
	OurSpotifyTokenDB.self[ "seconds_left" ] = seconds_left
	OurSpotifyTokenDB.save()

def RefreshSpotifyTokenIfNecessary():
	if "seconds_left" not in OurSpotifyTokenDB.self:
		GenerateSpotifyToken()
		return
	time_now = int( time.time() )
	OurSpotifyTokenDB.self[ "seconds_left" ] = OurSpotifyTokenDB.self[ "expire_time" ] - time_now
	if OurSpotifyTokenDB.self[ "seconds_left" ] < 300:
		print( "Spotify Token is About to Expire in " + str( OurSpotifyTokenDB.self[ "seconds_left" ] ) + " Seconds" )
		GenerateSpotifyToken()
	else:
		print( "Spotify Token is Still Valid for " + str( OurSpotifyTokenDB.self[ "seconds_left" ] ) + " Seconds" )

RefreshSpotifyTokenIfNecessary()

cast = Chromecast( OurPersonalDB.self[ "chromecast_ip" ] )
print('cast {}'.format(cast))
cast.wait()

spotify_device_id = None

# Create a spotify client
client = spotipy.Spotify( auth=OurSpotifyTokenDB.self[ "access_token" ] )
spotipy.trace = True
spotipy.trace_out = True

# Launch the spotify app on the cast we want to cast to
sp = SpotifyController( OurSpotifyTokenDB.self[ "access_token" ] , OurSpotifyTokenDB.self[ "seconds_left" ] )
cast.register_handler(sp)
sp.launch_app()

if not sp.is_launched and not sp.credential_error:
	print('Failed to launch spotify controller due to timeout')
	sys.exit(1)
if not sp.is_launched and sp.credential_error:
	print('Failed to launch spotify controller due to credential error')
	sys.exit(1)

# Query spotify for active devices
devices_available = client.devices()

# Match active spotify devices with the spotify controller's device id
for device in devices_available['devices']:
	if device['id'] == sp.device:
		spotify_device_id = device['id']
		break

if not spotify_device_id:
	print('No device with id "{}" known by Spotify'.format(sp.device))
	print('Known devices: {}'.format(devices_available['devices']))
	sys.exit(1)

# client.current_playback()
client.start_playback()
print( client.currently_playing() )