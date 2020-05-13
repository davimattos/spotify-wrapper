import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { getAlbum, getAlbums, getAlbumTracks } from "../src";

chai.use(sinonChai);
global.fetch = require("node-fetch");

describe("Album", () => {
  let fetchedStub;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, "fetch");
    fetchedStub.resolves({ json: () => ({ album: "name" }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe("smoke test", () => {
    it("should have getAlbum method", () => {
      expect(getAlbum).to.exist;
    });

    it("should have getAlbums method", () => {
      expect(getAlbums).to.exist;
    });

    it("should have getAlbumTracks method", () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe("getAlbum", () => {
    it("should call fetch function", () => {
      const albums = getAlbum();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should reveice the correct URl to fetch", () => {
      const albums = getAlbum("1vCWHaC5f2uS3yhpwWbIA6");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/1vCWHaC5f2uS3yhpwWbIA6"
      );
    });

    it("should return the JSON Data from the promise", () => {
      const albums = getAlbum("1vCWHaC5f2uS3yhpwWbIA6");

      albums.then((data) => expect(data).to.be.eql({ album: "name" }));
    });
  });

  describe("getAlbums", () => {
    it("should call fetch function", () => {
      const albums = getAlbums();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should reveice the correct URl to fetch", () => {
      const albums = getAlbums([
        "1vCWHaC5f2uS3yhpwWbIA6",
        "1vCWHaC5f2uS3yhpwWbIA6",
      ]);

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/?ids=1vCWHaC5f2uS3yhpwWbIA6,1vCWHaC5f2uS3yhpwWbIA6"
      );
    });

    it("should return the JSON Data from the promise", () => {
      const albums = getAlbums([
        "1vCWHaC5f2uS3yhpwWbIA6",
        "1vCWHaC5f2uS3yhpwWbIA6",
      ]);

      albums.then((data) => expect(data).to.be.eql({ album: "name" }));
    });
  });

  describe("getAlbumTracks", () => {
    it("should call fetch function", () => {
      const tracks = getAlbumTracks();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should receive the correct URL to fetch", () => {
      const tracks = getAlbumTracks("1vCWHaC5f2uS3yhpwWbIA6");

      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/albums/1vCWHaC5f2uS3yhpwWbIA6/tracks"
      );
    });

    it("should return the JSON Data from the promise", () => {
      const tracks = getAlbumTracks("1vCWHaC5f2uS3yhpwWbIA6");

      tracks.then((data) => expect(data).to.be.eql({ album: "name" }));
    });
  });
});
