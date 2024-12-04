/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
async function Save() {
    var url = document.getElementById("configUrl").value;
    var width = document.getElementById("configWidth").value;
    var height = document.getElementById("configHeight").value;

    var uConfig = {};
    if (url) {
        uConfig["url"] = url;
    }
    if (width) {
        uConfig["width"] = width;
    }
    if (height) {
        uConfig["height"] = height;
    }
    
    uConfig["isSaveRedirect"] = true;
    const response = await window.versions.saveConfig(uConfig);
    document.getElementById("configUrl").value = response.url;
    document.getElementById("configWidth").value = response.width;
    document.getElementById("configHeight").value = response.height;
    console.log(response);
}

async function Init() {
    const response = await window.versions.loadConfig();
    document.getElementById("configUrl").value = response.url;
    document.getElementById("configWidth").value = response.width;
    document.getElementById("configHeight").value = response.height;
    console.log(response);
}
