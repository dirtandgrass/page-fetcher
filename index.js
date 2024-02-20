const fileSave = require('./src/fileSave');
const fetcher = require('./src/fetcher');

// Description: This file is the entry point for the application. It will parse the command line arguments and call the appropriate function to execute the application.
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node index.js <url> <filename>');
  process.exit(1);
}

const url = args[0];
const filename = args[1];

try {
  new URL(url);
} catch (e) {
  console.log(`Invalid URL ${url}`);
  process.exit();
}
