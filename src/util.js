async function removeOldEntries(URL) {
  const thirtyDaysAgo = Date.now() - 2592000000;
  try {
    const deleteObj = await URL.deleteMany({
      issuedDate: { $lte: thirtyDaysAgo },
    });
    console.log(`Number of documents deleted: ${deleteObj.deletedCount}`);
  } catch (err) {
    console.error("Error: ", err);
  }
}

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

module.exports = {
  removeOldEntries,
  shorten
}
