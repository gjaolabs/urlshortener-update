class Link {
  constructor(id, longURL, shortURL, issuedDate) {
    this.longURL = longURL;
    this.shortURL = shortURL;
    this.issuedDate = issuedDate;
    this.id = id;
  }

  static createLink(linkObj, type) {
    if (type === "mongo") {
      return new Link(
        linkObj?._id,
        linkObj?.longURL,
        linkObj?.shortURL,
        linkObj?.issuedDate
      );
    } else {
      return new Link(
        linkObj?.id,
        linkObj?.longurl,
        linkObj?.shorturl,
        linkObj?.issueddate
      );
    }
  }
}

module.exports = Link;
