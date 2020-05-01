import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { getAlbum, getAlbumTracks } from "../src/album";

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

    it("should have getAlbumTracks method", () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe("GetAlbum", () => {
    it("should call fetch function", () => {
      const albums = getAlbum();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should reveice the correct URl to fetch", () => {
      const albums = getAlbum("1vCWHaC5f2uS3yhpwWbIA6");

      expect(fetchedStub).to.have.been.calledWith(
        "https://www.spotify.com/v1/albums/1vCWHaC5f2uS3yhpwWbIA6"
      );
    });

    it("should return the JSON Data from the promise", () => {
      const albums = getAlbum("1vCWHaC5f2uS3yhpwWbIA6");

      albums.then((data) => expect(data).to.be.eql({ album: "name" }));
    });
  });
});
