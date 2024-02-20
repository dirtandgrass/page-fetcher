const fs = require('fs').promises;

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

module.exports = getFileStatus;