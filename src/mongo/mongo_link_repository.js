const Link = require("../Link");

class MongoLinkRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  //Outputs anything for if statement
  async countLink(longUrl) {
    const linkObj = await this.dbConn.URL.findOne({ longURL: longUrl });

    return linkObj;
  }

  //Outputs longURL
  async getLink(shortUrl) {
    const linkObj = await this.dbConn.URL.findOne({ shortURL: shortUrl });

    return Link.createLink(linkObj, "mongo");
  }
  //Outputs shortURL and issuedDate
  async updateLink(longUrl, dateNow) {
    const linkObj = await this.dbConn.URL.findOne({ longURL: longUrl });

    if (linkObj?.shortURL) linkObj.issuedDate = dateNow;

    await linkObj.save();

    return Link.createLink(linkObj, "mongo");
  }

  //Outputs shortURL and issuedDate
  async saveLink(longUrl, shortUrl, dateNow) {
    const linkObj = this.dbConn.URL({
      longURL: longUrl,
      shortURL: shortUrl,
      issuedDate: dateNow,
    });

    await linkObj.save();

    return Link.createLink(linkObj, "mongo");
  }
}

module.exports = MongoLinkRepository;
