const queries = require("./queries");
const dbConn = require("./db");
class PgLinkRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  async countLink(longUrl) {
    const { rows } = await dbConn.query(queries.checkEntry, [longUrl]);
    return parseInt(rows[0].count);
  }

  async updateLink(longUrl, dateNow) {
    // TODO: use named params instead of positions in query
    // await dbConn.query(queries.updateEntry2, { issuedDate, longUrl });
    return await dbConn.query(queries.updateEntry, [dateNow, longUrl]);
  }

  async saveLink(longUrl, shortUrl, dateNow) {
    return await dbConn.query(queries.createEntry, [
      longUrl,
      shortUrl,
      dateNow,
    ]);
  }
}

module.exports = PgLinkRepository;
