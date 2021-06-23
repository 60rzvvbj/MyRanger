const {
	app,
	BrowserWindow,
	Menu,
	ipcMain
} = require('electron');
const path = require('path');

// Handle creating / removing shortcuts on Windows when installing / uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

// 隐藏菜单栏
Menu.setApplicationMenu(null);

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		// width: 800,
		// height: 600,
		fullscreen: true,
		opacity: 0.9,

		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, './src/index.html'));

	mainWindow.setTitle('myRanger');

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	ipcMain.on('close', function (e, data) {
		mainWindow.close();
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// const cmd = require('node-cmd');
// cmd.run('pip --version');