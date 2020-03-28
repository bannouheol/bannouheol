export default {
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString"
    },
    {
      name: "slug",
      title: "Slug",
      type: "localeSlug"
    },
    {
      name: "description",
      title: "Description",
      type: "localeBlockContent"
    },
    {
      name: "menuOrder",
      title: "Ordre dans le menu",
      type: "number"
    },
    {
      name: "parentCategory",
      title: "Catégorie parente",
      type: "reference",
      to: { type: "category" }
    }
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr"
    }
  },
  orderings: [
    {
      title: "Menu Order, Asc",
      name: "menuOrderAsc",
      by: [{ field: "menuOrder", direction: "asc" }]
    }
  ]
};
