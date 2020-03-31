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
  */
  if (Array.isArray(input)) {
    return input.map((r, i) =>
      input[i] && input[i].hasOwnProperty(language) ? input[i][language] : null
    )
  } else if (typeof input === "object") {
    const translated = {}
    for (const key of Object.keys(input)) {
      translated[key] = input[key][language]
    }
    return translated
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
