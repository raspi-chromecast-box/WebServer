#!/usr/bin/env python3

"""
Example on how to use the Spotify Controller.
NOTE: You need to install the spotipy and spotify-token dependencies.

This can be done by running the following:
pip install pychromecast
pip install spotify-token
pip install git+https://github.com/plamere/spotipy.git
"""
import argparse
import http.client as http_client
import logging
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


parser = argparse.ArgumentParser(
	description="Example on how to use the Spotify Controller.")
parser.add_argument('--show-debug', help='Enable debug log',
					action='store_true')
parser.add_argument('--cast',
					help='Name of cast device (default: "%(default)s")',
					default=OurPersonalDB.self[ "spotify" ][ "chromecast_name" ])
# parser.add_argument('--user', help='Spotify username', required=True)
# parser.add_argument('--password', help='Spotify password', required=True)
#parser.add_argument('--uri', help='Spotify uri(s) (default: "%(default)s")',default=["spotify:track:3Zwu2K0Qa5sT6teCCHPShP"],nargs='+')
parser.add_argument('--uri', help='Spotify uri(s) (default: "%(default)s")',
					default=["spotify:track:1T4vRONLAZCfutUESY6hok"],
					nargs='+')
args = parser.parse_args()

if args.show_debug:
	logging.basicConfig(level=logging.DEBUG)
	# Uncomment to enable http.client debug log
	#http_client.HTTPConnection.debuglevel = 1

# start_chromecast_discover_time = int( time.time() )
# chromecasts = pychromecast.get_chromecasts()
# cast = None
# for _cast in chromecasts:
# 	if _cast.name == args.cast:
# 		cast = _cast
# 		break
# stop_chromecast_discover_time = int( time.time() )
# chromecast_discover_time_duration = stop_chromecast_discover_time - start_chromecast_discover_time
# print( "Found the Chromecast using DNS resolution magic in " + str( chromecast_discover_time_duration ) + " seconds" )

cast = Chromecast( OurPersonalDB.self[ "chromecast_ip" ] )

if not cast:
	print('No chromecast with name "{}" discovered'.format(args.cast))
	print('Discovered casts: {}'.format(chromecasts))
	sys.exit(1)

print('cast {}'.format(cast))

class ConnListener:
	def __init__(self, mz):
		self._mz=mz

	def new_connection_status(self, connection_status):
		"""Handle reception of a new ConnectionStatus."""
		if connection_status.status == 'CONNECTED':
			self._mz.update_members()

class MzListener:
	def __init__(self):
		self.got_members=False

	def multizone_member_added(self, uuid):
		pass

	def multizone_member_removed(self, uuid):
		pass

	def multizone_status_received(self):
		self.got_members=True

# Wait for connection to the chromecast
cast.wait()

spotify_device_id = None

# Create a spotify client
client = spotipy.Spotify( auth=OurSpotifyTokenDB.self[ "access_token" ] )
if args.show_debug:
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

# Player Controls
# Need to Skip "Finding" ChromeCast Everytime unless , the IP is "invalid somehow"
# https://github.com/plamere/spotipy/blob/13109c1613594e098f5ecddc64edbf465306052b/spotipy/client.py#L1276
# also https://github.com/plamere/spotipy/tree/master/examples
# ==========================================================================================================
#client.shuffle( True )
#client.shuffle( False )

# client.pause_playback()
# client.start_playback()

# client.previous_track()
# client.next_track()

# client.current_playback()
# client.currently_playing()
# ==========================================================================================================

# # Start playback
if args.uri[0].find('track') > 0:
  client.start_playback(device_id=spotify_device_id, uris=args.uri)
else:
  client.start_playback(device_id=spotify_device_id, context_uri=args.uri[0])

time.sleep( 2 )
client.shuffle( True )
# client.next_track()