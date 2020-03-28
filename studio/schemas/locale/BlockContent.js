import { SUPPORTED_LANGUAGES } from './languages'

export default {
  name: 'localeBlockContent',
  type: 'object',
  /*
  fieldsets: [
    {
      title: 'Traductions',
      name: 'translations',
      options: {collapsible: true}
    }
  ],
  */
  fields: SUPPORTED_LANGUAGES.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'blockContent',
    //fieldset: lang.isDefault ? null : 'translations'
  }))
}
