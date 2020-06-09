import * as AuthSession from 'expo-auth-session';
import { encode as btoa } from 'base-64';
import SpotifyWebAPI from 'spotify-web-api-node';
import { AsyncStorage } from 'react-native';

var spotifyApi = new SpotifyWebAPI()

export const spotifyCredentials = {
    clientId: '25afcf7c6bff4a51be62b2ae1a0dd298',
    clientSecret: '32195f75a64e4216a63ce4fa49a8e3b5',
    redirectUri: AuthSession.getRedirectUrl()
}

// Credit: https://medium.com/@zachrach/spotify-web-api-authorization-with-react-native-expo-6ee1a290b2b0
const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
const scopes = scopesArr.join(' ');

const getSpotifyAuth = async () => {
    try {
      const credentials = spotifyCredentials 
      const redirectUrl = credentials.redirectUri;
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          credentials.clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      });
      return result.params.code
    } catch (err) {
      console.error(err)
      return null
    }
}

// Also: https://medium.com/@zachrach/spotify-web-api-authorization-with-react-native-expo-6ee1a290b2b0
const getTokens = async () => {
  try {
    const authorizationCode = await getSpotifyAuth()
    const credentials = spotifyCredentials 
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
      }`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await AsyncStorage.setItem('AccessToken', accessToken);
    await AsyncStorage.setItem('RefreshToken',  refreshToken);
    await AsyncStorage.setItem('ExpirationTime',  expirationTime.toString());
  } catch (err) {
    console.error(err);
  }
}

// Also: https://medium.com/@zachrach/spotify-web-api-authorization-with-react-native-expo-6ee1a290b2b0
const refreshTokens = async () => {
    try {
      const credentials = spotifyCredentials
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      const refreshToken = await AsyncStorage.getItem('RefreshToken');
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        await getTokens();
      } else {
        const {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
          expires_in: expiresIn,
        } = responseJson;
  
        const expirationTime = new Date().getTime() + expiresIn * 1000;
        await AsyncStorage.setItem('AccessToken', newAccessToken);
        if (newRefreshToken) {
          await AsyncStorage.setItem('RefreshToken', newRefreshToken);
        }
        await AsyncStorage.setItem('ExpirationTime',  expirationTime.toString());}
    } catch (err) {
      console.error(err)
    }
  }

export const refreshIfNeeded = async (updateFlag) => {
  const expiration_time_string = await AsyncStorage.getItem('ExpirationTime');
  var expiration_time;
  try {
    expiration_time = parseInt(expiration_time_string);
  }
  catch {
    expiration_time = null;
  }
  if((expiration_time === null) || new Date().getTime() > expiration_time){
    await refreshTokens(); 
  }
  const access_token = await AsyncStorage.getItem('AccessToken');
  console.log(access_token);
  spotifyApi.setAccessToken(access_token);
  try {
    updateFlag(true);
  } catch {}
}

export const getUserPlaylists = () => {
  spotifyApi.getArtistAlbums(
    '43ZHCT0cAZBISjO8DG9PnE',
    { limit: 10, offset: 20 },
    function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(data.body);
      }
    }
  );
};