let ws = require('windows-shortcuts');

function fun(err, obj) {
	console.log(obj);
}

ws.query("C:/Users/Administrator/Desktop/temp.lnk", fun);