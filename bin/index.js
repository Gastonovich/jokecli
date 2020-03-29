const yargs = require("yargs");
const axios = require("axios");
const chalk = require("chalk");

const options = yargs
  .usage("Usage: -n <name>")
  .option("s", { alias: "search", describe: "Search term", type: "string" })
  .argv;

if (options.search) {
  console.log(chalk.blue(`Searching for jokes about ${options.search}...`));
} else {
  console.log(chalk.blue("Here's a random joke for you:"));
}

// The url depends on searching or not
const url = options.search
  ? `https://icanhazdadjoke.com/search?term=${escape(options.search)}`
  : "https://icanhazdadjoke.com/";

axios.get(url, { headers: { Accept: "application/json" } }).then(res => {
  if (options.search) {
    // if searching for jokes, loop over the results
    res.data.results.forEach(j => {
      console.log(chalk.yellow("\n" + j.joke));
    });
    if (res.data.results.length === 0) {
      console.log(chalk.red("no jokes found :'("));
    }
  } else {
    console.log(chalk.green(res.data.joke));
  }
});
