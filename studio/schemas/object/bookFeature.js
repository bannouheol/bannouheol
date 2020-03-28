export default {
  title: "Caractéristiques du livre",
  name: "bookFeature",
  type: "object",
  fields: [
    {
      title: "Auteur(s)",
      name: "authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "profile" }
        }
      ]
    },
    {
      title: "Illustrateur(s)",
      name: "illustrators",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "profile" }
        }
      ]
    },
    {
      title: "Scénariste(s)",
      name: "scriptwriters",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "profile" }
        }
      ]
    },
    { name: "numberOfPages", type: "number", title: "Nombre de pages" }
  ]
};
