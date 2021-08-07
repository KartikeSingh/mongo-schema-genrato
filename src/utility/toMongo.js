const write = require("./write");
const getType = require("./getMongoType");

/**
 * This function converts JSON Object to Mongo Schema
 * @param {Object} object Object which you want to convert 
 * @param {String} writeAt path to the file where you want us to write the schema, pass undefined if you dont want us to write
 * @param {Boolean} default True if you want to add auto default values
 * @param {Boolean} dev development related stuff , you can ignore it, DO NOT PASS TRUE
 * @exports Promise<Object> The basic object
 */

function toMongo(object, writeAt = undefined, _default = false, dev = false, options) {
    return new Promise(async (resolve, reject) => {

        if ((typeof (object) !== "object" || Object.keys(object).length > 0 === false) && dev !== true) return reject("Invalid Object was provided, Please provide a JSON Object to conver it into Mongo Schema");
        if ((object.length === 0 || Object.keys(object).length > 0 === false) && dev === true) {
            if (!_default) return resolve(Array.isArray(object) ? "Array" : "Object");
            else return resolve(Array.isArray(object) ? "{type:Array,default:[]}" : "{type:Object,default:{}}");
        }

        let keys = Object.keys(object);
        let vals = Object.values(object);

        let sName = writeAt ? writeAt.split("/") : ["schemaName"];
        sName = sName[sName.length - 1]

        let objectString = "const mongoose = require('mongoose');\n\nconst Schema = new mongoose.Schema({";
        let ar = [];

        for (let i = 0; i < keys.length; i++) {
            let type = getType(vals[i], _default, keys[i], options);

            if (type === "Object") {
                type = await toMongo(vals[i], undefined, _default, true, options);
            }

            if (!type) {
                delete object[keys[i]];
                continue;
            }

            object[keys[i]] = type.object ? type.object : type;

            if (type.object) type = JSON.stringify(type.object)

            while (type.includes('"')) type = type.replace('"', " ");

            objectString += `\n${keys[i] + " : " + type},`

        }

        if (writeAt) {
            objectString += `\n});\n\nmodule.exports = mongoose.model('${sName}',Schema)`;
            write(writeAt, objectString);
        }

        if (dev) resolve({ object });
        else resolve(objectString);
    });
}

module.exports = toMongo;