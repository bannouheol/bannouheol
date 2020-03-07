export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e6381d03ad1f47dcf6e30a0',
                  title: 'Sanity Studio',
                  name: 'bannouheol-studio',
                  apiId: '082c1715-6ad3-44cc-a412-5dec0af857b8'
                },
                {
                  buildHookId: '5e6381d07a9ac843ad595a2b',
                  title: 'Blog Website',
                  name: 'bannouheol',
                  apiId: '63db7998-09b2-4f8b-8133-5e80b268628b'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/bannouheol/bannouheol',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://bannouheol.netlify.com', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
