const queries = require("./queries");
const dbConn = require("./db");
const Link = require("../Link");

class PgLinkRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  //Outputs anything for if statement
  async countLink(longUrl) {
    const { rows } = await dbConn.query(queries.checkEntry, [longUrl]);

    return parseInt(rows[0].count);
  }

  //Outputs longURL
  async getLink(shortUrl) {
    const results = await dbConn.query(queries.findEntry, [shortUrl]);

    let hasUrl = results.rows[0]?.longurl ?? null;
    if (hasUrl == null) {
      return null;
    }

    return Link.createLink(results.rows[0]);
  }

  //Outputs shortURL and issuedDate
  async updateLink(longUrl, dateNow) {
    const results = await dbConn.query(queries.updateEntry, [dateNow, longUrl]);

    return Link.createLink(results.rows[0]);
  }

  //Outputs shortURL and issuedDate
  async saveLink(longUrl, shortUrl, dateNow) {
    const results = await dbConn.query(queries.createEntry, [
      longUrl,
      shortUrl,
      dateNow,
    ]);
    console.log(results);
    return Link.createLink(results.rows[0]);
  }
}

module.exports = PgLinkRepository;
