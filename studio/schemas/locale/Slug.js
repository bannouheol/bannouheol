import { SUPPORTED_LANGUAGES } from "./languages";
import { format, parseISO } from "date-fns";

function slugify(text) {
  const a = "àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·_,:;";
  const b = "aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh-----";
  const p = new RegExp(a.split("").join("|"), "g");

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, "-ha-") // Replace & with 'and'
    .replace(/[^\w\-\/]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export default {
  type: "object",
  name: "localeSlug",
  fields: SUPPORTED_LANGUAGES.map((lang) => ({
    name: lang.id,
    type: "slug",
    title: lang.title,
    options: {
      source: (document) => {
        const date = document.publishedAt
          ? format(parseISO(document.publishedAt), "yyyy/MM/")
          : "";
        const title = document.title && document.title[lang.id];
        return date + title;
      },
      maxLength: 96,
      auto: true,
      slugify: (input) => slugify(input),
    },
    validation: (Rule) => Rule.required(),
  })),
};
