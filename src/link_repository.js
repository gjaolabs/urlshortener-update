const db = require("./db");
const queries = require("./queries");
/**
 * shortUrl is our unique key in the Link Model
 *
 * @type {{getLink(*), saveLink(*), countLink(*), updateLink(*, *)}}
 */
let dbDriver;

class LinkRepository {

  constructor(dbImpl) {
    this.dbImpl = dbImpl
  }

  async countLink(longUrl) {
    await dbImpl.countLink(longUrl)
  }

  async getLink(shortUrl) {
    await dbImpl.getLink(shortUrl)
  }

  async updateLink(longURL, dateNow) {
    await dbImpl.updateLink(longURL, dateNow)
  }

  async saveLink(longUrl, shortUrl, dateNow) {
    await dbImpl.saveLink(longUrl, shortUrl, dateNow)
  }
}

class PgLinkRepository {

  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  async countLink(longUrl) {
    await dbConn.query(queries.checkEntry, [longUrl])
  }

  async updateLink(longUrl, dateNow) {
    // TODO: use named params instead of positions in query
    await dbConn.query(queries.updateEntry, [dateNow, longUrl])
  }

  async saveLink(longUrl, shortUrl, dateNow) {
    await db.query(queries.createEntry, [longUrl, shortUrl, dateNow])
  }

}

class MongoLinkRepository {
  // todo: implement me. This and PG repositories can be in separate modules.
}

// 1 === 1 can be a config setting.
let dbImpl = 1 === 1 ? new PgLinkRepository(db) : new MongoLinkRepository()

module.exports = new LinkRepository(dbImpl)
