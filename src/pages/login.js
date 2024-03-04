import React, { useEffect } from "react";
import { spotify_client_id } from "../keys";

export default function Login({ accessToken, setAccessToken, user, getName }) {


  useEffect(() => {
    const getAccessTokenFromUrl = () => {
      const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
          if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});

      if (hash.access_token) {
        setAccessToken(hash.access_token);
        getName(hash.access_token);
      }
    };
    getAccessTokenFromUrl();
  }, [setAccessToken, getName]);

  const loginFlow = () => {
    const clientId = spotify_client_id;
    const redirectUri = window.location.href.includes('localhost')? 'http://localhost:3000/':'https://manage-spotify.netlify.app/';
    const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public'];
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const redirectUrl = encodeURIComponent(redirectUri);
    const scope = encodeURIComponent(scopes.join(' '));
    const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=token`;
    window.location = url;
  }

  const logoutFlow = () => {
    setAccessToken('');
    sessionStorage.clear();
    window.history.replaceState(null, null, '/');
  }


  return (
    <div className="login-div">
      <div className="login-button">
        {!accessToken && (
        <div className="logged-out-div">
        <h2 className="white-text" id="login-message">Login to your spotify account and get quick access to song search and playlist creation</h2>
        <button onClick={loginFlow} className='spc-button' id='sp-login-button'><i className="fa-brands fa-spotify"></i> Login to Spotify</button>
        </div>
      )}
        {accessToken && (
          <div className="logged-in-div">
            <p className="white-text">Hi {user}!</p>
            <button onClick={logoutFlow} className='spc-button'>Logout</button>
          </div>
        )}
      </div>
    </div>
  )




}
