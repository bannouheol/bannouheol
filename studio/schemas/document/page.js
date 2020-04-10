import { MdContentPaste } from "react-icons/md";
export default {
  name: "page",
  title: "Page",
  type: "document",
  icon: MdContentPaste,
  fields: [
    {
      name: "title",
      title: "Titre de la page",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "localeSlug",
    },
    {
      name: "content",
      title: "Contenu",
      type: "localeBlockContent",
    },
    {
      name: "createPage",
      title: "Créer une page dédiée",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr",
    },
  },
};
