let cmd = require('node-cmd'); // cmd包，用来运行命令
let fs = require('fs'); // 文件包
let {
	ipcRenderer,
	shell
} = require('electron'); // electron包
const {
	resolve
} = require('path'); // 路径工具包
let path = require('path');
let windowsShortcuts = require('windows-shortcuts'); // 快捷方式工具包

let nowPath = path.join(process.cwd());
let fileMap = new Map(); // 路径文件列表map
let pathRecord = new Stack(); // 历史记录栈
pathRecord.push(nowPath); // 记录第一个路径

let nowFileList;
let nowFile;

let headerPath = getDom('.header .path');
let headerNow = getDom('.header .now');

let mainLeft = getDom('.main .left');
let mainMiddle = getDom('.main .middle');
let mainRight = getDom('.main .right');

let footerNumber = getDom('.footer .number');

/**
 * 加载文件夹
 */
function loadfolder() {
	headerPath.innerText = nowPath;
	if (nowPath.length != 3) {
		headerPath.innerText += '\\';
	}
	mainLeft.removeAllChild();

	if (nowPath != path.join(nowPath, '..')) {
		let {
			fileList,
			lightIndex,
			scroll
		} = getfileList(path.join(nowPath, '..'));
		for (let i = 0; i < fileList.length; i++) {
			let file = fileList[i];

			let li = document.createElement('li');
			li.innerText = file.content;
			li.addClass(file.className);

			if (lightIndex == i) {
				li.addClass('light');
			}

			mainLeft.appendChild(li);
		}
		mainLeft.scrollTo(0, scroll);

	};

	nowFileList = getfileList(path.join(nowPath));
	let {
		fileList,
		lightIndex
	} = nowFileList;

	mainMiddle.removeAllChild();

	for (let i = 0; i < fileList.length; i++) {
		let file = fileList[i];

		let li = document.createElement('li');
		li.innerText = file.content;
		li.addClass(file.className);
		li.fileType = file.className;
		li.index = i;

		if (lightIndex == i) {
			li.addClass('light');
			nowFile = li;
		}

		mainMiddle.appendChild(li);
	}

	loadRight();
	headerNow.innerText = nowFile.innerText;
	footerNumber.innerText = `${nowFile.index + 1}/${mainMiddle.children.length}`;
}

loadfolder();

/**
 * 加载右侧内容
 */
function loadRight() {
	mainRight.removeAllChild();
	if (nowFile.fileType == 'folder') {
		let {
			fileList,
			lightIndex
		} = getfileList(path.join(nowPath, nowFile.innerText));

		for (let i = 0; i < fileList.length; i++) {
			let file = fileList[i];

			let li = document.createElement('li');
			li.innerText = file.content;
			li.addClass(file.className);
			li.className = file.className;
			li.index = i;

			if (lightIndex == i) {
				li.addClass('light');
			}

			mainRight.appendChild(li);
		}

	} else {
		let text = getFileContent(path.join(nowPath, nowFile.innerText));
		let div = document.createElement('div');
		div.innerText = text;
		div.addClass('content');
		mainRight.appendChild(div);
	}
}

/**
 * 获取文件列表
 * @param {string} url 文件夹路径
 * @returns 文件夹列表{fileList, lightIndex, scroll}
 */
function getfileList(url) {
	if (fileMap.get(url)) {
		return fileMap.get(url);
	} else {
		let res = {
			fileList: [],
			lightIndex: 0,
			scroll: 0,
		};
		let files = fs.readdirSync(url);
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
				className: '',
			};
			let pathName = path.join(url, fileName);
			if (pathName == nowPath) {
				res.lightIndex = i;
			}
			try {
				let status = fs.statSync(pathName);
				if (status.isDirectory()) {
					f.className = 'folder';
				} else {
					if (/.(exe|lnk)$/.test(f.content)) {
						f.className = 'exe';
					} else {
						f.className = 'file';
					}
				}
			} catch (e) {}
			res.fileList.push(f);
		}
		fileMap.set(url, res);
		return res;
	}
}

/**
 * 获取文件内容
 * @param {string} url 文件路径
 * @returns 文件内容
 */
function getFileContent(url) {
	if (fileMap.get(url)) {
		return fileMap.get(url);
	} else {
		let stat = fs.statSync(url);
		let res;
		if (stat.size > 409600) {
			res = '文件过大';
		} else {
			text = fs.readFileSync(url, 'utf8');
			let status = 1;
			for (let i = 0; i < text.length; i++) {
				if (text.charCodeAt(i) == 0) {
					status = 0;
					break;
				}
			}
			if (status) {
				res = text;
			} else {
				res = '该文件为二进制文件';
			}
		}
		fileMap.set(url, res);
		return res;
	}
}

/**
 * 
 * @param {*} step 
 */
function changeNowFile(step) {
	let afterIndex = nowFileList.lightIndex + step;
	if (afterIndex > mainMiddle.children.length - 1) {
		afterIndex = mainMiddle.children.length - 1;
	} else if (afterIndex < 0) {
		afterIndex = 0;
	}
	nowFile.removeClass('light');
	nowFile = mainMiddle.children[afterIndex];
	nowFileList.lightIndex = afterIndex;
	nowFile.addClass('light');
	headerNow.innerText = nowFile.innerText;
	footerNumber.innerText = `${nowFile.index + 1}/${mainMiddle.children.length}`;

	let listHeight = mainMiddle.children[0].offsetHeight;
	let nowHeight = nowFileList.lightIndex * listHeight;
	let boxStart = nowFileList.scroll;
	let boxEnd = boxStart + mainMiddle.offsetHeight;
	if (nowHeight < boxStart) {
		nowFileList.scroll = nowHeight;
	} else if (nowHeight + listHeight > boxEnd) {
		nowFileList.scroll = nowHeight - mainMiddle.offsetHeight + listHeight;
	}
	mainMiddle.scrollTo(0, nowFileList.scroll);
	loadRight();
}

/**
 * 更改路径
 */
function changePath(newPath, notRecord) {
	if (notRecord !== true) {
		pathRecord.push(nowPath); // 记录上一次路径
	}
	nowPath = newPath;
	loadfolder();
}

// 键盘事件
document.addEventListener('keydown', function (e) {
	if (e.key == 'j') { // 返回上一级目录
		changePath(path.join(nowPath, '..'));
	} else if (e.key == 'i') { // 上
		changeNowFile(-1);
	} else if (e.key == 'k') { // 下
		changeNowFile(1);
	} else if (e.key == 'I') { // 上5次
		changeNowFile(-5);
	} else if (e.key == 'K') { // 下5次
		changeNowFile(5);
	} else if (e.key == 'l') { // 跳转到选择的目录或打开选择的文件
		if (nowFile.fileType != 'folder') { // 如果不是目录
			if (/.lnk$/.test(nowFile.innerText)) { // 判断是不是快捷方式
				let lnk = shell.readShortcutLink(path.join(nowPath, nowFile.innerText));
				let status = fs.statSync(lnk.target);
				if (status.isDirectory()) { // 判断快捷方式是否指向目录
					changePath(path.join(lnk.target)); // 跳转目录
				} else { // 打开快捷方式
					cmd.run(path.join(nowPath, nowFile.innerText));
				}
			} else { // 打开文件
				cmd.run(path.join(nowPath, nowFile.innerText));
			}
		} else { // 如果是目录
			changePath(path.join(nowPath, nowFile.innerText)); // 跳转目录
		}
	} else if (e.key == 'q') { // 退出程序
		process.chdir(nowPath);
		ipcRenderer.send('close');
	} else if (e.ctrlKey && e.key == 's') { // 在当前目录打开cmder
		cmd.run(`cmder ${nowPath}`);
	} else if (e.ctrlKey && e.key == 'c') { // 复制当前目录
		setShearPlateData(nowPath);
	} else if (e.key == 'b') {
		let oldPath = pathRecord.pop();
		if (oldPath != null) {
			changePath(oldPath, true);
		}
	}
});