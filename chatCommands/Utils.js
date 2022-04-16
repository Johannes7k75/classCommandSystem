module.exports.getFiles = (dirPath, arrayOfFiles = []) => {
    try {
        const files = FS.list(dirPath); // fs.readdirSync();

        files.forEach(file => {
            JsMacros.open();
            if (FS.isDir(dirPath + "/" + file)) {
                arrayOfFiles = getFiles(dirPath + '/' + file, arrayOfFiles);
            } else {
                arrayOfFiles.push(dirPath + '/' + file);
            }
        });
        Chat.log(arrayOfFiles + "Array");
    } catch (e) {
        console.log(e);
    }
    return arrayOfFiles;
};