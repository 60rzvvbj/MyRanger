/**
 * 获取文件列表
 * @param {string} url 文件夹路径
 * @returns 文件夹列表{fileList, lightIndex, scroll}
 */
export function getFileList(url) {
  if (fileMap.get(url)) {
    return fileMap.get(url);
  } else {
    let res = {
      fileList: [],
      lightIndex: 0,
      scroll: 0,
    };
    let files;
    if (url == "") {
      files = [...driveLetters];
    } else {
      try {
        files = fs.readdirSync(url);
      } catch (e) {
        files = [];
      }
    }
    let arr = [];
    for (file of files) {
      try {
        fs.statSync(path.join(url, file));
        arr.push(file);
      } catch (e) {}
    }
    files = arr;
    files.sort(function (a, b) {
      let sta = fs.statSync(path.join(url, a));
      let stb = fs.statSync(path.join(url, b));
      if (sta.isDirectory() && stb.isDirectory()) {
        return a - b;
      } else if (sta.isDirectory()) {
        return -1;
      } else if (stb.isDirectory()) {
        return 1;
      } else {
        if (/.(exe|lnk)$/.test(a) && /.(exe|lnk)$/.test(b)) {
          return a - b;
        } else if (/.(exe|lnk)$/.test(a)) {
          return 1;
        } else if (/.(exe|lnk)$/.test(b)) {
          return -1;
        } else {
          return a - b;
        }
      }
    });
    for (let i = 0; i < files.length; i++) {
      let fileName = files[i];
      let f = {
        content: fileName,
        className: "",
      };
      let pathName = path.join(url, fileName);
      if (pathName == nowPath) {
        res.lightIndex = i;
      }
      try {
        let status = fs.statSync(pathName);
        if (status.isDirectory()) {
          f.className = "folder";
        } else {
          if (/.(exe|lnk)$/.test(f.content)) {
            f.className = "exe";
          } else {
            f.className = "file";
          }
        }
      } catch (e) {}
      res.fileList.push(f);
    }
    fileMap.set(url, res);
    return res;
  }
}
