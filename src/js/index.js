let cmd = require('node-cmd');
let fs = require('fs');
let {
	ipcRenderer
} = require('electron');
const {
	resolve
} = require('path');
let path = require('path');

let nowPath = path.join(process.cwd());
let fileMap = new Map();
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
					if (/.(exe|lnk)$/.test(f)) {
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

// 键盘事件
document.addEventListener('keydown', function (e) {
	if (e.key == 'j') {
		nowPath = path.join(nowPath, '..');
		loadfolder();
	} else if (e.key == 'i') {
		changeNowFile(-1);
	} else if (e.key == 'k') {
		changeNowFile(1);
	} else if (e.key == 'I') {
		changeNowFile(-5);
	} else if (e.key == 'K') {
		changeNowFile(5);
	} else if (e.key == 'l') {
		if (nowFile.fileType != 'folder') {
			cmd.run(path.join(nowPath, nowFile.innerText));
		} else {
			nowPath = path.join(nowPath, nowFile.innerText);
			loadfolder();
		}
	} else if (e.key == 'q') {
		process.chdir(nowPath);
		ipcRenderer.send('close');
	} else if (e.ctrlKey && e.key == 's') {
		cmd.run(`cmder ${nowPath}`);
	} else if (e.ctrlKey && e.key == 'c') {
		setShearPlateData(nowPath);
	}
});