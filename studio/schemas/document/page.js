export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de la page',
      type: 'localeString'
    },
    {
      name: 'content',
      title: 'Contenu',
      type: 'localeBlockContent'
    },
  ],
  preview: {
    select: {
      title: 'title.br',
      subtitle: 'title.fr'
    }
  }
}
