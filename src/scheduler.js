// node-cron will run every 30 days through both databases and remove entries older than 30 days

//To do so, the cron processes will need access to both databases when running, running them once for postgres, once for mongo

/*
To ensure that your tasks are executed on a regular schedule, your Node.js script needs to be running continuously. This could be on a server, a local machine, or any environment where you have your Node.js application deployed and running as a long-running process. Many developers use process managers like PM2 to keep Node.js applications running in the background on servers.
*/

//First we create a Mongo func for removing old entries - it needs to scour the whole DB and remove those older than 30 days

async function removeOldEntriesMongo() {
  //Connect to MongoDB
  const mongoConnect = require("./mongo/connector");
  const db = require("./mongo/models");

  if (mongoConnect.connState() === 0) {
    mongoConnect.connect();
  }

  const thirtyDaysAgo = Date.now() - 2592000000;
  try {
    const deleteObj = await db.URL.deleteMany({
      issuedDate: { $lte: thirtyDaysAgo },
    });
    console.log(`Number of documents deleted: ${deleteObj.deletedCount}`);
  } catch (err) {
    console.error("Error: ", err);
  }
}

//Here we create an identical functionality for Postgres

async function removeOldEntriesPostgres() {
  const db = require("./postgres/db");
  const countEntry = `SELECT COUNT(*) FROM url_shortener WHERE issuedDate < NOW() - INTERVAL '30 days';
  `;
  const deleteEntry = `DELETE FROM url_shortener WHERE issuedDate < NOW() - INTERVAL '30 days';
`;

  try {
    var deleteCount = await db.query(countEntry);
    console.log("deleteCount: ", deleteCount);
  } catch (error) {
    console.log("Error executing query: ", error);
  } finally {
    if (deleteCount?.rows[0].count) {
      console.log(
        "Number of documents to be deleted: ",
        deleteCount.rows[0].count
      );
      await db.query(deleteEntry);
    }
  }
}

// Here we create the cron scheduler
const cron = require("node-cron");

const config = require("../config");

function scheduler() {
  console.log("Message from scheduler");

  // Schedule a task to run every thirty days
  const task = cron.schedule("*/10 * * * * *", () => {
    // Your task code goes here
    config?.DB_TYPE === "mongo"
      ? removeOldEntriesMongo()
      : removeOldEntriesPostgres();

    console.log("Task executed every ten seconds.");
  });

  // Start the cron job
  task.start();
}

module.exports = scheduler;
