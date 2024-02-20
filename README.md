# Page Fetcher

A simple Node.js script to fetch web pages and save them to a file.

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.

## Usage

To fetch a web page, run the following command:

```bash
npm start <URL> <output file>
```

For example:

```bash
npm start http://www.example.com ./index.html
```

### Notes
* The output file will be created if it does not exist.
* If the output file already exists, the user will be prompted to confirm.