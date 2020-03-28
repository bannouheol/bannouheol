export default {
  name: "profile",
  title: "Profil",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nom",
      type: "localeString",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "localeSlug"
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
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr",
      media: "avatar"
    }
  }
};
