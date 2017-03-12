const fs = require('fs');
const path = require('path');


module.exports = options => {
    return (req, res, next) => {
        let dir = options.dir;
        let languageHeader = (req.headers['accept-language']).split(",");
        languageHeader = ((languageHeader[0]).toString()).toLowerCase();
        languageHeader = languageHeader.replace('-', '_');

        let fileRead = null;
        var fileObject = {};

        /**
         * Read all files inside directory
         */
        try {
            fileRead = fs.readdirSync(dir + '/');
            for (let index = 0; index < fileRead.length; ++index) {
                let outPutFile = fileRead[index];

                if (outPutFile.startsWith('messages') && outPutFile.match(/\.json$/) !== null) {
                    let readingFile = fs.readFileSync(path.resolve(dir, outPutFile), 'utf8');
                    let objectKey = outPutFile.substr(outPutFile.indexOf("_") + 1).split('.')[0];
                    objectKey = objectKey.replace('-', '_');

                    fileObject[objectKey] = JSON.parse(readingFile);
                }
            }
        } catch (err) {
            console.error(`no such  directory found named "${dir}"`);
            console.error(`${err}\n`);
        }

        if (fileObject[languageHeader]) {
            req.i18nMessages = fileObject[languageHeader];
        } else {
            req.i18nMessages = fileObject.messages;
        }
        next();
    }
}