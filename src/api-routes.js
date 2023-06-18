const { removeOldEntries, shorten } = require('./util')
const { URL } = require('../mongo-models')
const routes = function(app) {

  //Post URL (check if its already in the collection; if YES return and extend timer), convert and save to MongoDB, return JSON
  app.post("/api/shorturl", async (req, res) => {
    removeOldEntries(URL);
    const url = req.body.url;

    //Would replace this with client-side form validation in the future
    if (!url?.includes("https://") && !url?.includes("http://")) {
      return res.json({ error: "invalid url" });
    }

    try {
      const checkObject = await URL.findOne({ longURL: url });
      if (checkObject?.shortURL) {
        checkObject.issuedDate = Date.now();
        await checkObject.save();
        res.json({ shortURL: checkObject.shortURL });
      } else {
        const newObject = new URL({
          longURL: url,
          shortURL: shorten(),
          issuedDate: Date.now()
        });
        await newObject.save();
        res.json({ shortURL: newObject.shortURL });
      }
    } catch (err) {
      res.send("Error: " + err);
    }
  });

  // add /api/get-link endpoint to read 'http://service-domain/{publicId}', find mongo entry by checking the id, and then respond the real link
  app.get("/api/link/:shorturl", async (req, res) => {
    const shorturl = req.params.shorturl;
    try {
      const checkObject = await URL.findOne({ shortURL: shorturl });
      res.json({ "Long URL": checkObject.longURL });
    } catch (err) {
      res.send(err);
    }
  });

  // add another endpoint that instead od responding string, will execute 302 redirect. Map it to 'service-domain/l/publicId'
  app.get("/l/:publicId", async (req, res) => {
    const shorturl = req.params.publicId;
    try {
      const checkObject = await URL.findOne({ shortURL: shorturl });
      res.redirect(checkObject.longURL);
    } catch (err) {
      res.send(err);
    }
  });

}

module.exports = routes
