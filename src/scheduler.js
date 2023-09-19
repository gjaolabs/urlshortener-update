// node-cron will run every 30 days through both databases and remove entries older than 30 days

//To do so, the cron processes will need access to both databases when running, running them once for postgres, once for mongo

/*
To ensure that your tasks are executed on a regular schedule, your Node.js script needs to be running continuously. This could be on a server, a local machine, or any environment where you have your Node.js application deployed and running as a long-running process. Many developers use process managers like PM2 to keep Node.js applications running in the background on servers.
*/

//First we create a Mongo func for removing old entries - it needs to scour the whole DB and remove those older than 30 days

async function removeOldEntriesMongo() {
  //Connect to MongoDB
  const mongoConnect = require("./mongo/connector");
  const URL = require("./mongo/models");

  mongoConnect.connect();

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

//Here we create an identical functionality for Postgres

async function removeOldEntriesPostgres() {}

// Here we create the cron scheduler
const cron = require("node-cron");

function scheduler() {
  // Schedule a task to run every thirty days
  const task = cron.schedule("0 */12 * * *", () => {
    // Your task code goes here

    console.log("Task executed every thirty days.");
  });

  // Start the cron job
  task.start();
}

module.exports = scheduler;
