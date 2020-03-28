export default {
  name: "product",
  title: "Produit",
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
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" }
        }
      ]
    },
    {
      name: "collection",
      title: "Collection",
      type: "reference",
      to: { type: "collection" }
    },
    {
      name: "ref",
      title: "Référence",
      type: "string"
    },
    {
      title: "Default variant",
      name: "defaultProductVariant",
      type: "productVariant"
    },
    {
      title: "Variants",
      name: "variants",
      type: "array",
      of: [
        {
          title: "Variant",
          type: "productVariant"
        }
      ]
    },
    {
      name: "vendor",
      title: "Editeur",
      type: "reference",
      to: { type: "vendor" }
    },
    {
      name: "body",
      title: "Body",
      type: "localeBlockContent"
    },
    {
      title: "Traducteur(s)",
      name: "traductor",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "person" }
        }
      ]
    },
    {
      title: "Age minimum",
      name: "minimumAge",
      type: "number"
    },
    {
      title: "Date de sortie",
      name: "releaseDate",
      type: "date"
    },
    {
      title: "Caractéristiques du livre",
      name: "bookFeature",
      type: "bookFeature"
    },
    {
      title: "Caractéristiques du DVD",
      name: "dvdFeature",
      type: "dvdFeature"
    },
    {
      title: "Vidéos YouTube",
      name: "youtubeVideos",
      type: "array",
      of: [
        {
          title: "Vidéo Youtube",
          type: "youtube"
        }
      ]
    }
    /*
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        layout: 'tags'
      }
    },
    */
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr",
      manufactor: "manufactor.title",
      media: "defaultProductVariant.images[0]"
    }
  }
};
