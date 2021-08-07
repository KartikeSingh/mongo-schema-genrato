function getType(thing, _default, key, options = {}) {
    let req = options.required || [];
    let unq = options.unique || [];
    let _t = typeof (thing);

    let defaults = {
        Boolean: thing,
        Number: parseInt(thing) || 0,
        String: "'" + thing + "'" || "''",
        Array: thing || "[]",
        Object: thing || "{}",
    }

    let type = _t === "boolean" ? "Boolean" : _t === "number" ? "Number" : _t === "symbol" ? "String" : _t === "string" ? "String" : _t === "object" ? "Object" : undefined;

    if (_default && ((type === "object" && Object.keys(thing).length === 0) || type !== "Object")) type = `{type:${type},default:${defaults[type]}}`;
  //  else type = `{type:${type}}`;

   // if(req.some((v) => v === key))type = type.substring(0,type.length-1)+",required:true }";
  // if(unq.some((v) => v === key))type = type.substring(0,type.length-1)+",unique:true }";
    return type;
}

module.exports = getType;