export default {
    title: 'Caractéristiques du livre',
    name: 'bookFeature',
    type: 'object',
    fields: [
      {
        title: 'Auteur(s)',
        name: 'author',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: {type: 'person'}
          }
        ]
      },
      {
        title: 'Illustrateur(s)',
        name: 'illustrator',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: {type: 'person'}
          }
        ]
      },
      {
        title: 'Scénariste(s)',
        name: 'scenario',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: {type: 'person'}
          }
        ]
      },
      {name: 'numberOfPages', type: 'number', title: 'Nombre de pages'}
    ]
}