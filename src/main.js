export const search = (query, type) => {
  return fetch(
    `https://api.spotify.com/v1/search?query=${query}&type=${type}`
  ).then((data) => data.json());
};

export const searchAlbuns = () => {};
export const searchArtists = () => {};
export const searchTracks = () => {};
export const searchPlaylists = () => {};
