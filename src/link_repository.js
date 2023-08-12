/**
 * shortUrl is our unique key in the Link Model
 *
 * @type {{getLink(*), saveLink(*), countLink(*), updateLink(*, *)}}
 */

const PgLinkRepository = require("./postgres/pg_link_repository");

let dbImpl = new PgLinkRepository();

class LinkRepository {
  constructor(dbImpl) {
    this.dbImpl = dbImpl;
  }

  async countLink(longUrl) {
    return await dbImpl.countLink(longUrl);
  }

  async getLink(shortUrl) {
    return await dbImpl.getLink(shortUrl);
  }

  async updateLink(longURL, dateNow) {
    return await dbImpl.updateLink(longURL, dateNow);
  }

  async saveLink(longUrl, shortUrl, dateNow) {
    return await dbImpl.saveLink(longUrl, shortUrl, dateNow);
  }
}

class MongoLinkRepository {
  // todo: implement me. This and PG repositories can be in separate modules.
}

// 1 === 1 can be a config setting.
//let dbImpl = 1 === 1 ? new PgLinkRepository(db) : new MongoLinkRepository();

module.exports = new LinkRepository(dbImpl);
