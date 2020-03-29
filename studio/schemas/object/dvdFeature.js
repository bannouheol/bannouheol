export default {
  title: "Caractéristiques du DVD",
  name: "dvdFeature",
  type: "object",
  fields: [
    { name: "duration", type: "number", title: "Durée (min)" },
    { name: "numbersOfDvd", type: "number", title: "Nombre de DVD" },
    { name: "numberOfEpisodes", type: "number", title: `Nombre d'épisodes` },
    { name: "bonus", type: "boolean", title: "Bonus inclus" }
  ]
};
