export default {
  name: "blogPost",
  title: "Post",
  type: "document",
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
      name: "previousPath",
      title: "Adresse ancien site",
      type: "string",
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
      name: "excerpt",
      title: "Intro courte",
      type: "localeText",
    },
    {
      name: "body",
      title: "Contenu",
      type: "localeBlockContent",
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
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr",
      media: "image",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: typeof title === "undefined" ? subtitle : title,
        subtitle: typeof title === "undefined" ? null : subtitle,
      };
    },
  },
};
