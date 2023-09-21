const checkEntry = "SELECT count(*) FROM url_shortener WHERE longURL = $1";

const updateEntry =
  "UPDATE url_shortener SET issuedDate = $1 WHERE longURL = $2 RETURNING shortURL, issuedDate";

const updateEntry2 =
  "UPDATE url_shortener SET issuedDate = :issuedDate WHERE longURL = :longUrl RETURNING shortURL";

const createEntry =
  "INSERT INTO url_shortener (longURL, shortURL, issuedDate) VALUES ($1, $2, $3) RETURNING shortURL, longURL, issuedDate";

const findEntry = "SELECT longURL FROM url_shortener WHERE shortURL = $1";

module.exports = {
  checkEntry,
  updateEntry,
  createEntry,
  findEntry,
};
