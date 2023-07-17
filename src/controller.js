const db = require("./db");
const queries = require("./queries");
const { dateToDB, shorten } = require("./util.js");

const postEntry = (req, res) => {
  const url = req.body.url;
  const now = dateToDB();
  try {
    //Check if it exists, if YES update Date, return JSON
    db.query(queries.checkEntry, [url], (error, results) => {
      if (results.rows.length > 0) {
        //Entry exists, update DATE, return shortURL JSON
        db.query(queries.updateEntry, [now, url], (error, results) => {
          if (error) throw error;
          res
            .status(200)
            .json({ message: "Entry Updated.", response: results.rows });
        });
      } else {
        //Entry does not exist. Create new entry, return shortURL JSON
        const shorturl = shorten();
        db.query(
          queries.createEntry,
          [url, shorturl, now],
          (error, results) => {
            if (error) throw error;
            res
              .status(200)
              .json({ message: "New Entry Created.", response: results.rows });
          }
        );
      }
    });
  } catch (error) {
    console.error("Error Executing Query", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// add /api/get-link endpoint to read 'http://service-domain/{publicId}', find entry by checking the id, and then respond the real link in JSON

const getEntry = (req, res) => {
  const shorturl = req.params.shorturl;
  try {
    db.query(queries.findEntry, [shorturl], (error, results) => {
      //If entry exists return longURL
      if (results.rows.length > 0) {
        res
          .status(200)
          .json({ message: "URL Has Been Found.", response: results.rows });
      } else {
        res.status(200).json({ message: "Entry Does Not Exist." });
      }
    });
  } catch (error) {
    console.error("Error Executing Query.", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// add another endpoint that instead od responding string, will execute 302 redirect. Map it to 'api/redirect/shorturl'
const getRedirect = (req, res) => {
  const shorturl = req.params.shorturl;
  try {
    db.query(queries.findEntry, [shorturl], (error, results) => {
      if (results.rows.length > 0) {
        res.status(302).redirect(results.rows[0].longurl);
      } else {
        res
          .status(200)
          .json({ message: "Entry Does Not Exist. Cannot Redirect." });
      }
    });
  } catch (error) {
    console.error("Error Executing Query.", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = {
  postEntry,
  getEntry,
  getRedirect,
};
