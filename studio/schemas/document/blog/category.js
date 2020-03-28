export default {
  name: "blogCategory",
  title: "Catégorie de post",
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
      name: "parents",
      title: "Parent categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blogCategory" }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr"
    }
  }
};
