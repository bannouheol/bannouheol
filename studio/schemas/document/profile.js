import { IoMdPerson } from "react-icons/io";
import { SUPPORTED_LANGUAGES } from "../locale/languages";

export default {
  name: "profile",
  title: "Profil",
  type: "document",
  icon: IoMdPerson,
  fields: [
    {
      name: "title",
      title: "Nom",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "localeSlug",
      validation: (Rule) =>
        Rule.custom((slugs) => {
          return slugs.br && slugs.br.current && slugs.fr && slugs.fr.current
            ? true
            : {
                message: "Les deux slugs doivent être indiqués",
              };
        }),
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Biographie",
      type: "localeBlockContent",
    },
  ],
  preview: {
    select: {
      title: "title.br",
      subtitle: "title.fr",
      media: "avatar",
    },
  },
};
