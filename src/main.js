export const search = (query, type) => {
  fetch(`https://api.spotify.com/v1/search?query=${query}&type=${type}`);
};

export const searchAlbuns = () => {};
export const searchArtists = () => {};
export const searchTracks = () => {};
export const searchPlaylists = () => {};
