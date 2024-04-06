import type { Router } from "express";

import path from "path";
import fs from "fs";

export function importRoutes(): Router[] {
  const mainDirectory = path.join(__dirname, "..", "modules");
  const routerArray: Router[] = [];

  fs.readdirSync(mainDirectory).forEach((eachMain) => {
    fs.readdirSync(`${mainDirectory}/${eachMain}`).forEach((eachModule) => {
      if (eachModule.endsWith(".route.js")) {
        const route = require(path.join(
          `${mainDirectory}/${eachMain}`,
          eachModule
        ));
        routerArray.push(route.default);
      }
    });
  });

  return routerArray;
}
