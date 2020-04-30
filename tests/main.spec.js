import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

global.fetch = require("node-fetch");

import {
  search,
  searchAlbuns,
  searchArtists,
  searchPlaylists,
  searchTracks,
} from "../src/main";

describe("Spotify Wrapper", () => {
  describe("smoke tests", () => {
    it("should exist the search method", () => {
      expect(search).to.exist;
    });

    it("should exist the searchAlbuns method", () => {
      expect(searchAlbuns).to.exist;
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
    let fetchedStub;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
      fetchedStub.resolves({ json: () => ({ artist: "tania" }) });
    });

    afterEach(() => {
      fetchedStub.restore();
    });

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

      artists.then((data) => expect(data).to.be.eql({ artist: "tania" }));
    });
  });
});
