#!/usr/bin/env python3
import http.client as http_client
import time
import os
import sys
import pychromecast
from pychromecast import Chromecast
from pychromecast.controllers.spotify import SpotifyController
import spotify_token as st
import spotipy

def string_to_bool( input_string ):
	input_string = str( input_string )
	return input_string.lower() in ( "yes" , "true" , "t" , "1" )

def try_to_connect_to_redis():
	try:
		redis_connection = redis.StrictRedis(
			host="127.0.0.1" ,
			port="6379" ,
			db=1 ,
			#password=ConfigDataBase.self[ 'redis' ][ 'password' ]
			)
		return redis_connection
	except Exception as e:
		return False

def GenerateSpotifyToken( options ):
	try:
		print( "Generating Spotify Token" )
		data = st.start_session( options[ "username" ] , options[ "password" ] )
		access_token = data[ 0 ]
		seconds_left = data[ 1 ] - int( time.time() )
		result = {
			"access_token": access_token ,
			"expire_time": data[ 1 ] ,
			"seconds_left": seconds_left
		}
		return result
	except Exception as e:
		print( "Couldn't Generate Spotify Token" )
		print( e )
		return False

def RefreshSpotifyTokenIfNecessary( redis_connection ):
	try:
		spotify_personal = redis_connection.get( "SPOTIFY.PERSONAL" )
		spotify_personal = json.loads( spotify_personal )
		spotify_token_info = redis_connection.get( "SPOTIFY.TOKEN_INFO" )
		spotify_token_info = json.loads( spotify_token_info )
		if "seconds_left" not in spotify_token_info:
			spotify_token_info = GenerateSpotifyToken( spotify_personal )
			redis_connection.set( "SPOTIFY.TOKEN_INFO" , json.dumps( spotify_token_info ) )
			return spotify_token_info

		time_now = int( time.time() )
		spotify_token_info[ "seconds_left" ] = spotify_token_info[ "expire_time" ] - time_now
		if spotify_token_info[ "seconds_left" ] < 300:
			print( "Spotify Token is About to Expire in " + str( spotify_token_info[ "seconds_left" ] ) + " Seconds" )
			spotify_token_info = GenerateSpotifyToken()
			redis_connection.set( "SPOTIFY.TOKEN_INFO" , json.dumps( spotify_token_info ) )
			return spotify_token_info
		else:
			print( "Spotify Token is Still Valid for " + str( spotify_token_info[ "seconds_left" ] ) + " Seconds" )
			return spotify_token_info
	except Exception as e:
		print( "Couldn't Regenerate Spotify Token" )
		print( e )
		return False

def play():
	try:
		output_chromecast_ip = sys.argv[ 1 ]
		uri_to_play = sys.argv[ 2 ]
		shuffle = string_to_bool( sys.argv[ 3 ] )
		redis_connection = try_to_connect_to_redis()
		spotify_token_info = RefreshSpotifyTokenIfNecessary( redis_connection )
		cast = Chromecast( output_chromecast_ip )
		cast.wait()
		client = spotipy.Spotify( auth=spotify_token_info[ "access_token" ] )
		sp = SpotifyController( spotify_token_info[ "access_token" ] , spotify_token_info[ "seconds_left" ] )
		cast.register_handler( sp )
		sp.launch_app()
		if not sp.is_launched and not sp.credential_error:
			print('Failed to launch spotify controller due to timeout')
			sys.exit(1)
		if not sp.is_launched and sp.credential_error:
			print('Failed to launch spotify controller due to credential error')
			sys.exit(1)

		devices_available = client.devices()
		spotify_device_id = None
		for device in devices_available['devices']:
			if device['id'] == sp.device:
				spotify_device_id = device['id']
				break
		if not spotify_device_id:
			print('No device with id "{}" known by Spotify'.format(sp.device))
			print('Known devices: {}'.format(devices_available['devices']))
			sys.exit(1)

		# # Start playback
		if uri_to_play.find('track') > 0:
			client.start_playback( device_id=spotify_device_id , uris=uri_to_play )
		else:
			client.start_playback( device_id=spotify_device_id , context_uri=uri_to_play )

		time.sleep( 2 )
		client.shuffle( shuffle )
		return True
	except Exception as e:
		print( "Couldn't Load URI and Play Spotify" )
		print( e )
		return False

def try_run_block( options ):
	for i in range( options[ 'number_of_tries' ] ):
		attempt = options[ 'function_reference' ]()
		if attempt is not False:
			return attempt
		print( f"Couldn't Run '{ options[ 'task_name' ] }', Sleeping for { str( options[ 'sleep_inbetween_seconds' ] ) } Seconds" )
		time.sleep( options[ 'sleep_inbetween_seconds' ] )
	if options[ 'reboot_on_failure' ] == True:
		os.system( "reboot -f" )

try_run_block({
	"task_name": "Spotify Play" ,
	"number_of_tries": 5 ,
	"sleep_inbetween_seconds": 1 ,
	"function_reference": play ,
	"reboot_on_failure": True
	})