/**
 * shortUrl is our unique key in the Link Model
 *
 * @type {{getLink(*), saveLink(*), countLink(*), updateLink(*, *)}}
 */
class LinkRepository {
  constructor(dbImpl) {
    this.dbImpl = dbImpl;
  }

  async countLink(longUrl) {
    return await this.dbImpl.countLink(longUrl);
  }

  async getLink(shortUrl) {
    return await this.dbImpl.getLink(shortUrl);
  }

  async updateLink(longURL, dateNow) {
    return await this.dbImpl.updateLink(longURL, dateNow);
  }

  async saveLink(longUrl, shortUrl, dateNow) {
    return await this.dbImpl.saveLink(longUrl, shortUrl, dateNow);
  }
}

class MongoLinkRepository {
  // todo: implement me. This and PG repositories can be in separate modules.
}

// 1 === 1 can be a config setting.
//let dbImpl = 1 === 1 ? new PgLinkRepository(db) : new MongoLinkRepository();

module.exports = LinkRepository;
