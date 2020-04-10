import { MdLocalPostOffice } from "react-icons/md";
import { parseISO, format } from "date-fns";

export default {
  name: "blogPost",
  title: "Article de presse / Blog Post",
  type: "document",
  icon: MdLocalPostOffice,
  fields: [
    {
      title: "Language",
      name: "language",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Français", value: "fr" },
          { title: "Breton", value: "br" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Titre du post",
      type: "localeString",
    },
    {
      name: "slug",
      title: "Slug",
      type: "localeSlug",
    },
    {
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "blogCategory" },
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Date de publication",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
    {
      title: "Audio",
      name: "audio",
      type: "file",
    },
    {
      title: "Vidéo YouTube",
      name: "video",
      type: "youtube",
    },
    {
      title: "Profile(s) relié(s)",
      name: "featuredProfiles",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "profile" },
        },
      ],
    },
    {
      name: "excerpt",
      title: "Extrait",
      type: "localeText",
    },
    {
      name: "body",
      title: "Contenu",
      type: "localeBlockContent",
    },
    {
      name: "author",
      title: "Auteur (journal, radio, ...)",
      type: "reference",
      to: { type: "blogAuthor" },
    },
    {
      name: "products",
      title: "Relier à des produits",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    },
    {
      name: "previousPath",
      title: "Adresse ancien site",
      type: "string",
    },
  ],
  preview: {
    select: {
      titleBr: "title.br",
      titleFr: "title.fr",
      media: "image",
      date: "publishedAt",
    },
    prepare(selection) {
      const { titleFr, titleBr, media, date } = selection;
      return {
        title: typeof titleBr === "undefined" ? titleFr : titleBr,
        subtitle:
          format(parseISO(date), "dd/MM/yyyy") +
          (typeof titleBr === "undefined"
            ? ""
            : typeof titleFr === "undefined"
            ? ""
            : " / " + titleFr),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Date de publication, nouveaux",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
};
