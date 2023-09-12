//Bash script initialize database
 const dbInit =  () => {
    const { exec } = require("child_process");
  
  // Define the path to your Bash script
  const scriptPath = "src/postgres/db_init.sh";
  
  // Execute the Bash script
   exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the script: ${error}`);
      return;
    }
  
    console.log(`Script output:\n${stdout}`);
    console.error(`Script errors:\n${stderr}`);
  });
  };

module.exports = dbInit;