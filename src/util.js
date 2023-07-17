//Might need to update the RNG with another library
function shorten() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortURL = "";
  for (let i = 0; i < 8; i++) {
    shortURL += characters[Math.floor(Math.random() * characters.length)];
  }
  return shortURL;
}

//Create Date object and convert to Postgres-appropriate format
function dateToDB() {
  const currentDate = new Date();
  const postgresDateTime = currentDate.toISOString();
  return postgresDateTime;
}

module.exports = {
  shorten,
  dateToDB,
};
