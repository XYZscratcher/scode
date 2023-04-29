const getEl = (str) => document.getElementById(str);
const codeEl = getEl("code-editor")
const toPath = (str) => {
    if (navigator.userAgent.includes('Windows')) {
        return str.replaceAll('/', '\\');
    }
    return str;
}
const defaultPath=toPath('D:/blog/source/_post/')
getEl("open-file-btn").onclick = function (_event) {
    //console.log(toPath('D:/blog/'));
    api.openFile(defaultPath).then(r => {
        codeEl.textContent = r.v;
        //console.log(r)
        codeEl.dataset.lang=r.ext;
        sessionStorage.setItem("path",r.path)
        const ev = new Event("can-hl", { "bubbles": true, "cancelable": false });
        codeEl.dispatchEvent(ev)
    });
};
getEl("save-btn").onclick=function (_event) {
    let p=sessionStorage.getItem("path");
    if(p){
    api.saveFile(p,codeEl.innerText)}
    else{
        api.saveFile(toPath('D:/blog/source/_post/'),false)
    }
}
getEl("new-file-btn").onclick=function (_event) {

}