function saveFileFromString(str, filename) {
    const blob = new Blob([str], { type: 'text/plain' });
    const objURL = window.URL.createObjectURL(blob);

    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    const a = document.createElement('a');
    a.download = filename;
    a.href = objURL;
    a.click();
}

export default saveFileFromString;