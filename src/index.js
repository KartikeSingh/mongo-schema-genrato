const { toMongo } = require("./utility/index.js");

/**
 * This function will convert your normal JSON Object to Mongo Schema
 * @param {Object} object The JSON object
 * @param {String} writeAt Destination where you want to write the code
 * @param {Boolean} _default If you want to add default property automatically
 * @exports String The Schema Code
 */
function SchemaGenrator(object, writeAt = undefined, _default = false) {
    if (typeof (object) !== "object") throw new Error("Please provide an JSON object");
    if (typeof (writeAt) !== "string") throw new Error("The folder destination should be string ");


    return toMongo(object, writeAt, _default, false)
}

module.exports = SchemaGenrator;