import fs from "fs";
import { Transform } from "stream";

const readStream = fs.createReadStream("./logs.txt");

const writeFile = (ip) => {
  const writeStream = fs.createWriteStream(`./${ip}_requests.log`, {
    flags: "a",
  });
  return writeStream;
};

const firstLogRegExp = /89\.123\.1\.41.+/g;
const secondLogRegExp = /34\.48\.240\.111.+/g;

const transformStream = new Transform({
  transform(chunk, _, callback) {
    const firstRequiredLogsArr = chunk.toString().match(firstLogRegExp);
    const secondRequiredLogsArr = chunk.toString().match(secondLogRegExp);

    firstRequiredLogsArr.forEach((log) => {
      writeFile("89.123.1.41").write(`${log}\n`, (err) => {
        if (err) throw err;
      });
    });

    secondRequiredLogsArr.forEach((log) => {
      writeFile("34.48.240.111,").write(`${log}\n`, (err) => {
        if (err) throw err;
      });
    });

    callback();
  },
});

readStream.pipe(transformStream);
