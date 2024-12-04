/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// Preload (Isolated World)
// 三种方式在main与html之间通信
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  saveConfig: (config) => ipcRenderer.invoke('SaveConfig', config),
  loadConfig: (config) => ipcRenderer.invoke('LoadConfig'),
  setFullScreen: (isFull) => ipcRenderer.invoke('setFullScreen', isFull),
  isFullScreen: () => ipcRenderer.invoke('isFullScreen'),
  exit: () => ipcRenderer.invoke('exit'),
  showDevTools:(isShow) => ipcRenderer.invoke('showDevTools', isShow),
  refresh:() => ipcRenderer.invoke('refresh'),
});

contextBridge.exposeInMainWorld('tools', {
  ping: () => ipcRenderer.invoke('ping'),
  saveConfig: (config) => ipcRenderer.invoke('SaveConfig', config),
  loadConfig: (config) => ipcRenderer.invoke('LoadConfig'),
  setFullScreen: (isFull) => ipcRenderer.invoke('setFullScreen', isFull),
  isFullScreen: () => ipcRenderer.invoke('isFullScreen'),
  exit: () => ipcRenderer.invoke('exit'),
  showDevTools:(isShow) => ipcRenderer.invoke('showDevTools', isShow),
  refresh:() => ipcRenderer.invoke('refresh'),
})
