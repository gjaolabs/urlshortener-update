const queries = require("./postgres/queries");
const { dateToISO, shorten } = require("./util.js");
const LinkRepository = require("./link_repository");

function makeController(db) {
  const linkRepository = new LinkRepository(db);

  const postEntry = async (req, res) => {
    const url = req.body.url;
    const now = dateToISO();
    try {
      //Check if it exists, if YES update Date, return JSON
      const linkCount = await linkRepository.countLink(url);

      // TODO: refactor response to be number not rows
      if (linkCount > 0) {
        //Entry exists, update DATE, return shortURL JSON
        const results = await linkRepository.updateLink(url, now);
        return res
          .status(200)
          .json({ message: "Entry Updated.", response: results.rows });
      } else {
        //Entry does not exist. Create new entry, return shortURL JSON
        const shorturl = shorten();
        const results = await linkRepository.saveLink(url, shorturl, now);
        return res
          .status(200)
          .json({ message: "New Entry Created.", response: results.rows });
      }
    } catch (error) {
      console.error("Error Executing Query", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };

  // add /api/get-link endpoint to read 'http://service-domain/{publicId}', find entry by checking the id, and then respond the real link in JSON

  const getEntry = async (req, res) => {
    const shorturl = req.params.shorturl;
    try {
      const foundLink = await linkRepository.getLink(shorturl);
      console.log(foundLink);
      //If entry exists return longURL
      if (foundLink.rows[0]) {
        res.status(200).json({
          message: "URL Has Been Found.",
          response: foundLink.rows,
        });
      } else {
        res.status(200).json({ message: "Entry Does Not Exist." });
      }
    } catch (error) {
      console.error("Error Executing Query.", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  // add another endpoint that instead od responding string, will execute 302 redirect. Map it to 'open/shorturl'
  const getRedirect = async (req, res) => {
    const shorturl = req.params.shorturl;
    try {
      const foundLink = await linkRepository.getLink(shorturl);
      console.log(foundLink);

      if (foundLink.rows[0]) {
        res.status(302).redirect(foundLink.rows[0].longurl);
      } else {
        res
          .status(200)
          .json({ message: "Entry Does Not Exist. Cannot Redirect." });
      }
    } catch (error) {
      console.error("Error Executing Query.", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };

  return {
    postEntry,
    getEntry,
    getRedirect,
  };
}

module.exports = makeController;
