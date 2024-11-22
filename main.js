// Modules to control application life and create native browser window
const { app, BrowserWindow ,ipcRenderer} = require('electron');
const path = require('node:path');
const fs = require('fs');
//增加chrome启动参数
//禁用沙箱模式
//app.commandLine.appendArgument("--no-sandbox");

//https://juejin.cn/post/7271896318956027967
//https://github.com/electron/electron/releases/tag/v33.2.0
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname,'build/icons/login.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      //是否注入nodeapi
      //nodeIntegration: true,
      //渲染进程是否启用remote模块
      //enableRemoteModule: true,
      //sandbox: false
    }
  });

  // 禁用菜单栏中的开发者工具选项
  mainWindow.removeMenu();

  const contents = mainWindow.webContents;
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
      
      return;
    }

    if (input.key === 'F12') {
      if (contents.isDevToolsOpened()) {
        contents.closeDevTools();
      }else{
        contents.openDevTools();
      }
      
      event.preventDefault();
      return;
    }
    
    if (input.key === 'F5') {
      contents.reload();
      event.preventDefault();
      return;
    }

    if (input.control && input.key === 'F5') {
      contents.reloadIgnoringCache();
      event.preventDefault();
      return;
    }
  });
  // //配置h5页面的文件路径
  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  //http://127.0.0.1:9108/Default.aspx
  // mainWindow.loadURL("http://127.0.0.1:9108/Default.aspx")
  // mainWindow.loadURL("https://chrome.360.cn/test/html5/webgl/index.html")
  //https://liulanmi.com/tools
  //mainWindow.loadURL("https://browserbench.org/JetStream/")
  //mainWindow.loadURL("https://onlineconvertfree.com/zh/converter/images/")

  //加载配置文件
  // 获取安装目录
  
  // let configPath = path.join(__dirname, 'config.json');
// 获取安装目录
let exePath = path.dirname(app.getPath('exe')).replace(/\\/g, "/");
let configPath = `${exePath}/config.json`;
  // 读取配置文件
  fs.readFile(configPath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Read Config Error:', err);
    return;
  }
    const config = JSON.parse(data);
    mainWindow.loadURL(config.url);
    console.log('Config Contents:', config);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//当 Electron 完成初始化时，发出一次
app.on('ready', ()=>{
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
