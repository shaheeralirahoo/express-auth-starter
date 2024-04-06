import chalk from "chalk";
import moment from "moment";

export const logger = {
  log(message: string) {
    const date = moment().format("DD/MM/YYYY, hh:mm:ss A");
    console.log(
      chalk.yellow(date),
      "-",
      chalk.green("[LOG]"),
      "-",
      chalk.green(message)
    );
  },
  error(message: string) {
    const date = moment().format("DD/MM/YYYY, hh:mm:ss A");
    console.log(
      chalk.yellow(date),
      "-",
      chalk.red("[LOG]"),
      "-",
      chalk.red(message)
    );
  },
};
