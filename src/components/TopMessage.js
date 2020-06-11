/** @jsx jsx */

import { jsx, Box } from 'theme-ui'
import { useTranslation } from 'react-i18next'

export const TopMessage = () => {
  const {
    t,
    //i18n: { language },
  } = useTranslation('common')

  return (
    <Box sx={{ width: 'full', textAlign: 'center', bg: 'grey', color: 'white', fontSize: [0, 1, 1, 2], p: [1, 0] }}>
      <span sx={{ color: 'tomato' }}>{t('top_message_title')}</span> {t('top_message_content')}
    </Box>
  )
}
