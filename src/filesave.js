const fs = require('fs').promises;

// simple object to save data to a given file
const filesave = {
  save: async(filename, data) => await fs.writeFile(filename, data)
};


module.exports = filesave;