# Installation

```
npm i mongo-schema-genrator
```

# Why use us?
Are you also annyoned writing Mongo DB Schema for your Database?
if Yes than you are at the right place, you can use this package to easily convert a JSON Objec to Mongo Schema of your choice.

# How to Use ?

```js
const schemaGenrator = require("mongo-schema-genrator");

// Your example JSON object
const exampleJSON = {
    id:123,
    name:"some name",
    contact:1234567890,
    hobbies : ["coding", "gaming", "watching anime"],
    adress : {
        country:"Unknown",
        state:"new state",
        city:"great city",
        houseNumber:23
    },
    male:true,
}

// first parameter is the JSON Object
// Second is the path where you want to write the code
// Third means if you want default values
schemaGenrator(exampleJSON,"models/user.js",false);

// You can see the output in Output box
```

# Outputs

## Basic Output
```js
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    id:{type:Number},
    name:{type:String},
    contact:{type:Number},
    hobbies : [{type:String}, {type:String}, {type:String}],
    adress : {
        country:{type:String},
        state:{type:String},
        city:{type:String},
        houseNumber:{type:Number}
    },
    male:{type:Boolean},
})

module.exports = new mongoose.Model("Schema",Schema);
```

## Output with Defaults
So defaults are the values you provided in the JSON Object
```js
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
   id:{type:Number,default:123},
    name:{type:String,default:"some name"},
    contact:{type:Number,default:1234567890},
    hobbies : [{type:String, default:"coding"}, {type:String, default:"gaming"}, {type:String, default:"watching anime"}],
    adress : {
        country:{type:String, default:"unknown"},
        state:{type:String, default:"new state"},
        city:{type:String, default:"great city"},
        houseNumber:{type:Number, default:23}
    },
    male:{type:Boolean,default:true},
})

module.exports = new mongoose.Model("Schema",Schema);
```