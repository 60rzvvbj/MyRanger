import dev from "@/utils/dev.js";
import path from "path";
let configFileData = require("@/../config/config.json");

// let programPath = __dirname;
// console.log(programPath);
// let configPath = path.join(programPath, "../../../../config/config.json");
// let configPath;
// console.log(process);
// console.log(process.cwd());
// let programPath = path.resolve();
// if (dev) {
//   configPath = path.resolve(programPath, "../../config/config.json");
//   console.log(configPath);
// }

// 默认配置
let config = {
  username: "60rzvvbj",
  keymap: {
    up: "i",
    down: "k",
    UP: "I",
    DOWN: "K",
    left: "j",
    right: "l",
    back: "b",
    quit: "q",
    OpenInWindows: ["ctrl", "w"],
    OpenInCmder: ["ctrl", "s"],
    CopyNowPath: ["ctrl", "c"],
  },
};

Object.assign(config, configFileData);

export default config;
