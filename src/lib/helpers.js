import { format, isFuture } from "date-fns"

export function cn(...args) {
  return args.filter(Boolean).join(" ")
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map((edge) => edge.node)
}

export const translateRaw = (input, language) => {
  /*
  Test this function with this data :
    const _rawTitle = {"fr": "Title FR"}
    const _rawBody = {"fr": "Body FR", "br": "Body BR"}
  For objects : 
    const {title, body} = translateRaw({ title: _rawTitle, body: _rawBody }, "br"));
    console.log(title, body);
  For arrays : 
    const [title, body] = translateRaw([_rawTitle, _rawBody], "br");
    console.log(title, body);

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

  if (input instanceof Object) {
    Object.keys(input).forEach(function (key) {
      reduceField(input, key, language)
      const item = input[key]
      if (item instanceof Object || item instanceof Array) {
        translateRaw(item, language)
      }
    })
  } else if (input instanceof Array) {
    input.forEach(function (item, ix) {
      reduceField(input, ix, language)
      if (item instanceof Object || item instanceof Array) {
        translateRaw(item, language)
      }
    })
  }
  return input
  function reduceField(parent, key, lang) {
    var value = parent[key]
    if (value instanceof Object && value.hasOwnProperty(lang)) {
      if (Object.isExtensible(parent)) {
        if (key.substring(0, 4) === "_raw") key = key.substring(4).charAt(0).toLowerCase() + key.substring(5)
        parent[key] = value[lang]
      }
    }
  }
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt)
}

export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(publishedAt, "YYYY/MM")}/${slug.current || slug}/`
}

export function buildImageObj(source = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function toPlainText(blocks) {
  if (!blocks) {
    return ""
  }
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return ""
      }
      return block.children.map((child) => child.text).join("")
    })
    .join("\n\n")
}

export function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + "..."
}
