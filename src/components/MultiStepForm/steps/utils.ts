export const getSpotifyAuthUrl = () => {
  const CLIENT_ID =
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
  const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const REDIRECT_URL_AFTER_LOGIN = 'http://localhost:3000/dashboard';

  const SCOPES = ['playlist-modify-public', 'user-top-read'];
  const SPACE_DELIMITER = '%20';
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  return `${AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
};
