const data = {
  _rawTitle: {
    fr: "rootFR",
    br: "rootBr"
  },
  collection: {
    _rawTitle: {
      fr: "collectionTitleFR",
      br: "collectionTitleBR"
    },
    _rawBody: {
      fr: "collectionBodyFR",
      br: "collectionBodyBR"
    }
  },
  category: {
    _rawTitle: {
      fr: "categoryTitleFR",
      br: "categoryTitleBR"
    }
  },
  notReduced: {
    dummy: 1,
    var: 2
  },
  halfReduced: {
    dummy: 1,
    var: 2,
    _rawTitle: {
      fr: "halfReducedTitleFR",
      br: "halfReducedTitleBR"
    }
  }
};
/*
const transformed = {
  _rawTitle: "titleFR",
  collection: {
    _rawTitle: "titleFR",
    _rawBody: "bodyFR"
  },
  category: {
    _rawTitle: "catTitleFR"
  },
  notReduced: {
    dummy: 1,
    var: 2
  },
  halfReduced: {
    dummy: 1,
    var: 2,
    _rawTitle: "halfReducedTitleFR"
  }
};
*/

function translateRaw(obj, lang) {
  if (obj instanceof Object) {
    Object.keys(obj).forEach(function(key) {
      reduceField(obj, key, lang);
      const item = obj[key];
      if (item instanceof Object || item instanceof Array) {
        translateRaw(item, lang);
      }
    });
  } else if (obj instanceof Array) {
    obj.forEach(function(item, ix) {
      reduceField(obj, ix, lang);
      if (item instanceof Object || item instanceof Array) {
        translateRaw(item, lang);
      }
    });
  }
  return obj;
  function reduceField(parent, key, lang) {
    var value = parent[key];
    if (value instanceof Object && value.hasOwnProperty(lang)) {
      if (key.substring(0, 4) === "_raw")
        key =
          key
            .substring(4)
            .charAt(0)
            .toLowerCase() + key.substring(5);
      parent[key] = value[lang];
    }
  }
}

console.log(translateRaw(data, "fr"));

/*

function iterate(obj) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (property.substring(0, 4) === "_raw") {
        //console.log(obj[property]["fr"]);
        return (obj[property] = obj[property]["fr"]);
      }
      if (typeof property === "object" && property !== "fr") {
        console.log("returning nothing");
        obj.property = iterate(property);
      } else if (property == "fr") {
        console.log("returning" + obj["fr"]);
        return obj["fr"];
      }
    } else {
      console.log("returning nothing");
    }
    return obj;
  }
}

console.log(iterate(data));

*/

/*

function iterateRules(input) {
  input.rules.map(function(item) {
    if (_.has(item, "rules")) {
      this.iterateRules(item);
    } else if (_.has(item, "data")) {
      return (item.data = "foo");
    }
  }, this);
  console.log(input);
}

iterateRules(data);



*/
/*

function unwrap(obj, prefix) {
  var res = {}

  for (const [k, v] of Object.entries(obj)) {
    if (obj[k].hasOwnProperty("fr")) res[k] = obj[k]
    else if (typeof obj[k] === "object") {
      console.log(obj[k])
      unwrap(obj[k], k)
    }
  }

  return res
}
*/
