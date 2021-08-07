const fs = require("fs");

module.exports = (path, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const path_ = require.main.path;

            path = path.split("/");

            if (path.length > 1) {
                for (let i = 0; i < path.length; i++) {
                    let _path = ""

                    for (let _i = 0; _i < i; _i++) {
                        _path += `\\${path[_i]}`
                    }

                    _path += `\\${path[i]}`;

                    if (!fs.existsSync(path_ + _path) && i !== path.length - 1) fs.mkdirSync(path_ + _path);

                }
            }

            path = path.join("/");

            fs.writeFileSync(path_ + "\\" + path, data, (e) => {
                if (!e) resolve("done");
                reject(e)
            });
        } catch (e) {
            reject(e);
        }
    })
}