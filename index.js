require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URI)
  .then(console.log("DB CONNECTION SUCCESFUL"))
  .catch((err) => console.error(err));

app.get("/db-health", (req, res) => {
  res.json({ status: mongoose.connection.readyState });
});

// Basic Configuration

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const URLSchema = mongoose.Schema(
  {
    longURL: String,
    shortURL: String,
    issuedDate: Date,
  },
  { versionKey: false }
);

const URL = mongoose.model("URL", URLSchema);

//Might need to update the RNG with another library
function shorten() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortURL = "";
  for (i = 0; i < 8; i++) {
    shortURL += characters[Math.floor(Math.random() * characters.length)];
  }
  return shortURL;
}

async function removeOldEntries() {
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

//Post URL (check if its already in the collection; if YES return and extend timer), convert and save to MongoDB, return JSON

app.post("/api/shorturl", async (req, res) => {
  removeOldEntries();
  const url = req.body.url;

  //Would replace this with client-side form validation in the future
  if (!url.includes("https://") && !url.includes("http://")) {
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
        issuedDate: Date.now(),
      });
      await newObject.save();
      res.json({ shortURL: newObject.shortURL });
    }
  } catch (err) {
    res.send("Error: " + err);
  }
});

// add /api/get-link endpoint to read 'http://service-domain/{publicId}', find mongo entry by checking the id, and then respond the real link

app.get("/api/get-link/:shorturl", async (req, res) => {
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

app.listen(port, "0.0.0.0", function () {
  console.log(`Listening on port ${port}`);
});
