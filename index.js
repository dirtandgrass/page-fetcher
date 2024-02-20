const fs = require('fs').promises;
const { get } = require('axios');
const getFileStatus = require('./getFileStatus');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Description: This file is the entry point for the application. It will parse the command line arguments and call the appropriate function to execute the application.
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node index.js <url> <filename>');
  process.exit();
}

const url = args[0];
// replace backslashes with forward slashes
const filename = args[1].replace(/\\/g, '/');

// check if valid url
try {
  new URL(url);
} catch (e) {
  console.log(`Invalid URL ${url}`);
  process.exit();
}

const main = async(url, filename) => {
  try {
    const fileExists = await getFileStatus(filename);
    if (fileExists) {
      console.log(`File ${filename} already exists, should I overwrite it? [y/n]`);

      // prompt user to overwrite file
      await new Promise((resolve) => {
        readline.question('', (answer) => {
          if (answer.toLowerCase() === 'y') {
            resolve();
          } else {
            console.log('Exiting...');
            process.exit();
          }
        });
      });
      process.exit();
    }
  } catch (e) {
    // error trying to get file status
    console.log(e.message);
    process.exit();
  }

  try {
    // make get request
    const {data, status} = await get(url);
    console.log(`${url.substring(0, 25)}... \n\t returned status ${status}`);
    // save data to file
    await fs.writeFile(filename, data);
    console.log(`Data saved to ${filename}`);

  } catch (e) {
    console.log(e.message);
    console.log(`Error fetching data from ${url}`);

  }
  process.exit();
};

// run main
main(url, filename);
