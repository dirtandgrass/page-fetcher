const fs = require('fs').promises;
const { get } = require('axios');


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


const getFileStatus = async(filename) => {
  // check if valid filename


  const path = filename.split('/');
  const file = path[path.length - 1];
  // const pathStr = path.slice(0, path.length - 1).join('/');

  if (file.length === 0) {
    // could probably use more validation here
    throw new Error('Invalid filename');
  }

  try {
    const fileStats = await fs.stat(filename);
    if (fileStats.isFile()) {
      return true;
    }
    // entity exists, but is not a file
    throw new Error('Invalid filename');
  } catch (err) {
    // file does not exist
    return false;
  }
};




const main = async(url, filename) => {
  try {
    const fileExists = await getFileStatus(filename);
    if (fileExists) {
      console.log(`File ${filename} already exists, should I overwrite it? [y/n]`);
      // todo: wait for user input
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
    process.exit();
  }



};

main(url, filename);
