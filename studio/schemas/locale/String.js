import { SUPPORTED_LANGUAGES } from './languages'

export default {
  name: 'localeString',
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
    type: 'string',
    //fieldset: lang.isDefault ? null : 'translations'
  }))
}
