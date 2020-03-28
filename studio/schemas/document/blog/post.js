export default {
  name: "blogPost",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre du post",
      type: "localeString"
    },
    {
      name: "slug",
      title: "Slug",
      type: "localeSlug"
    },
    {
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "blogCategory" }
        }
      ]
    },
    {
      name: "publishedAt",
      title: "Date de publication",
      type: "date"
    },
    {
      name: "image",
      type: "image",
      title: "Image"
    },
    {
      name: "body",
      title: "Contenu",
      type: "localeBlockContent"
    },
    {
      name: "products",
      title: "Relier à des produits",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }]
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
