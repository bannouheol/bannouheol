import { useTranslation } from 'react-i18next'

export const XInBreton = ({ x }) => {
  const { t } = useTranslation('common')
  const hasBreton = x.toLowerCase().includes('breton') || x.toLowerCase().includes('brezhoneg')
  return hasBreton ? x : t('x_in_breton', { x })
}
