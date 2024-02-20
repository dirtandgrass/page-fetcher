const { get } = require('axios');

// simple object to fetch data from a given url
const fetcher = {
  fetch: async(url) => {
    const response = await get(url);
    return response.data;
  },

};

module.exports = fetcher;
