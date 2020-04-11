#!/usr/bin/env python3

#import http.client as http_client
#import logging
import time
import os
import sys
import JSONFileOBJDB
from pathlib import Path
import requests
import pprint


from spotipy.oauth2 import SpotifyClientCredentials
from pychromecast.controllers.spotify import SpotifyController
# https://github.com/enriquegh/spotify-webplayer-token
import spotify_token as st
import spotipy

spotify_device_id = None
spotipy.trace = True
spotipy.trace_out = True

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


# sudo subl /usr/local/lib/python3.7/site-packages/spotipy/client.py

##https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/
##https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-flows
def get_users_playlist_ids_via_access_token( username ):
	# https://github.com/secuvera/SpotMyBackup.git
	# cd /Users/morpheous/WORKSPACE/PYTHON/SpotifyBackup
	# python -m SimpleHTTServer
	token = 'BQBZTHjG63KfVTkhxxQiNG8eWKsUaplWBzS3YekiqGztYmnuWsbtgs207SofVtPyVBgQn7Zc623ktRznt4hxw-p7KWqooPkfF6RSjleHzvXWjpZYPIO2zNS0IpXH24xl3BGVVuZQ0ArxnI1LsuXLt4KUIx-tRni5Cn_vYshDYF6LqzlyS2TaAjw12YtjUSuMyf1q_aq0PkV9aPU6NZTmJTyvXWxT8Aa85_BjcXa3W29r58iuXaUUpePP6xA'
	headers = {
		#'Authorization': f"Bearer {OurSpotifyTokenDB.self[ 'access_token' ]}" ,
		'Authorization': f"Bearer {token}" ,
	}
	response = requests.get( f"https://api.spotify.com/v1/users/{username}/playlists" , headers=headers )
	data = response.json()
	print( data )
#playlist_ids = get_users_playlist_ids_via_access_token( "erickurtz" )


# response = sp.playlist_tracks( playlist_uri ,
# 							  offset=offset ,
# 							  fields='items.track.id,total' )
def get_playlist_tracks_via_access_token( playlist_id ):
	offset = 0
	tracks = []
	while True:
		headers = {
			'Authorization': f"Bearer {OurSpotifyTokenDB.self[ 'access_token' ]}" ,
		}
		data = {
			"offset": offset ,
			"fields": 'items.track.id,total'
		}
		response = requests.get( f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks" , headers=headers , params=data )
		data = response.json()
		for i , item in enumerate( data[ 'items' ] ):
			if 'track' in item:
				if 'id' in item[ 'track' ]:
					tracks.append( item[ 'track' ][ 'id' ] )
		#tracks.append( data[ 'items' ] )
		offset = offset + len( data[ 'items' ] )
		print( offset , "/" , data[ 'total' ] )
		if len( data[ 'items' ] ) < 100:
			break
	return tracks

playlist_tracks = get_playlist_tracks_via_access_token( "2ez0DTeWzWy0m6GiC7iB5A" )
#playlist_tracks = get_playlist_tracks_via_access_token( "62X3rXn9sqbWI0XGbMEekj" )

pprint.pprint( playlist_tracks )
print( str( len( playlist_tracks ) ) )

# https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/
def create_playlist_via_access_token( playlist_name ):
	pass


# https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
def add_track_ids_to_playlist_via_access_token( track_ids ):
	pass







# ==============================================================================================================
# Via Spotify Developers APP

# client_credentials_manager = SpotifyClientCredentials( client_id=OurPersonalDB.self[ "spotify" ][ "client_id" ] , client_secret=OurPersonalDB.self[ "spotify" ][ "client_secret" ] )
# sp = spotipy.Spotify( client_credentials_manager=client_credentials_manager )

def get_user_info( username ):
	user = sp.user( username )
	pprint.pprint( user )
	return user

def get_users_playlists( username ):
	user_playlists = sp._get( f"users/{username}/playlists" )
	pprint.pprint( user_playlists )
	return user_playlists


# playlist_uri = 'spotify:playlist:5RIbzhG2QqdkaP24iXLnZX'
def get_playlist_info( playlist_uri ):
	offset = 0
	tracks = []
	while True:
		response = sp.playlist_tracks( playlist_uri ,
									  offset=offset ,
									  fields='items.track.id,total' )
		pprint.pprint( response[ 'items' ] )
		tracks.append( response[ 'items' ] )
		offset = offset + len( response[ 'items' ] )
		print( offset , "/" , response[ 'total' ] )

		if len( response[ 'items' ] ) == 0:
			break
	return tracks
#playlist_tracks = get_playlist_info( "spotify:playlist:2ez0DTeWzWy0m6GiC7iB5A" )

#playlist_tracks = sp.tracks( "spotify:playlist:2ez0DTeWzWy0m6GiC7iB5A" )
#pprint.pprint( playlist_tracks )

