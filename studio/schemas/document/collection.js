export default {
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "localeString",
      validation: Rule => Rule.required()
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
    }
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr"
    }
  }
};
