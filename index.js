import fs from "fs";
import readline from "readline";

const readStream = fs.createReadStream("./logs.txt");

const createWriteStream = (ip) => {
  return fs.createWriteStream(`./${ip}_requests.log`, {
    flags: "a",
  });
};

const IPs = ["89.123.1.41", "34.48.240.111"];

const rl = readline.createInterface({ input: readStream });

rl.on("line", (line) => {
  if (line.includes(IPs[0])) {
    createWriteStream(IPs[0]).write(`${line}\n`, (err) => {
      if (err) throw err;
    });
  }
  if (line.includes(IPs[1])) {
    createWriteStream(IPs[1]).write(`${line}\n`, (err) => {
      if (err) throw err;
    });
  }
});
