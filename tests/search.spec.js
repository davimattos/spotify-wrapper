import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);
global.fetch = require("node-fetch");

import {
  search,
  searchAlbums,
  searchArtists,
  searchPlaylists,
  searchTracks,
} from "../src";

describe("Search", () => {
  let fetchedStub;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, "fetch");
    fetchedStub.resolves({ json: () => ({ artist: "name" }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe("smoke tests", () => {
    it("should exist the search method", () => {
      expect(search).to.exist;
    });

    it("should exist the searchAlbuns method", () => {
      expect(searchAlbums).to.exist;
    });

    it("should exist the searchArtists method", () => {
      expect(searchArtists).to.exist;
    });

    it("should exist the searchTracks method", () => {
      expect(searchTracks).to.exist;
    });

    it("should exist the searchPlaylists method", () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe("Generic search", () => {
    it("should call the fetch function", () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should receive the correct url to fetch", () => {
      context("passing one type", () => {
        const artists = search("tania", "artist");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?query=tania&type=artist"
        );

        const albums = search("tania", "album");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?query=tania&type=album"
        );
      });

      context("passing more than one type", () => {
        const artistsAndAlbums = search("tania", ["artist", "album"]);
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?query=tania&type=artist,album"
        );
      });
    });

    it("should return the JSON Data from the promise", () => {
      const artists = search("tania", "artist");

      artists.then((data) => expect(data).to.be.eql({ artist: "name" }));
    });
  });

  describe("Artists search", () => {
    it("should call fetch function", () => {
      const artists = searchArtists("tania");

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should receive the correct URL to fetch", () => {
      const artists = searchArtists("tania");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=tania&type=artist"
      );

      const artists2 = searchArtists("Muse");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=Muse&type=artist"
      );
    });
  });

  describe("Albums search", () => {
    it("should call fetch function", () => {
      const albums = searchAlbums("tania");

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should receive the correct URL to fetch", () => {
      const albums = searchAlbums("tania");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=tania&type=album"
      );

      const albums2 = searchAlbums("Muse");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=Muse&type=album"
      );
    });
  });

  describe("Tracks search", () => {
    it("should call fetch function", () => {
      const tracks = searchTracks("tania");

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should receive the correct URL to fetch", () => {
      const tracks = searchTracks("tania");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=tania&type=track"
      );

      const tracks2 = searchTracks("Muse");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=Muse&type=track"
      );
    });
  });

  describe("Playlists search", () => {
    it("should call fetch function", () => {
      const playlists = searchPlaylists("tania");

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should receive the correct URL to fetch", () => {
      const playlists = searchPlaylists("tania");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=tania&type=playlist"
      );

      const playlists2 = searchPlaylists("Muse");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?query=Muse&type=playlist"
      );
    });
  });
});
