import fsPromises from "fs/promises";
import fs from "fs";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import inquirer from "inquirer";

const yargs = _yargs(hideBin(process.argv));

const options = yargs
  .positional("d", {
    describe: "Path to directory",
    default: process.cwd(),
  })
  .positional("p", {
    describe: "Pattern",
    default: "",
  }).argv;

let currentDir = options.d;

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }
  isDir() {
    return fs.lstatSync(this.path).isDirectory();
  }
}

const run = async () => {
  console.log(options.d);
  const list = await fsPromises.readdir(currentDir);
  const items = list.map((fileName) => {
    return new ListItem(path.join(currentDir, fileName), fileName);
  });

  const item = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: `Choose: ${currentDir}`,
        choices: items.map((item) => ({ name: item.fileName, value: item })),
      },
    ])
    .then((answer) => answer.fileName);

  if (item.isDir()) {
    currentDir = item.path;
    return await run();
  }
  const data = await fsPromises.readFile(item.path, "utf-8");

  if (!options.p) {
    console.log(data);
    return;
  }

  const regExp = new RegExp(options.p, "igm");
  const matches = data.match(regExp);
  if (!matches) {
    console.log("No matches found");
    return;
  }
  matches.forEach((data) => {
    console.log(data);
  });
};

run();
