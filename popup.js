function doTarget(){
chrome.tabs.executeScript(null, {file: "content.js"});
};

document.getElementById("btnTarget").onclick = doTarget;