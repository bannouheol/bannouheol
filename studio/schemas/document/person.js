export default {
  name: "person",
  title: "Personne",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nom",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "bio",
      title: "Biographie",
      type: "localeBlockContent"
    }
  ]
};
