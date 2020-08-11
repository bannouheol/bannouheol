/** @jsx jsx */

import { jsx, Text } from 'theme-ui'
import { graphql } from 'gatsby'
import { ProfilePreview } from './ProfilePreview'
import { useTranslation } from 'react-i18next'

export const BookFeature = ({ numberOfPages, illustrators, authors, scriptwriters }) => {
  const {
    t,
    //i18n: { language },
  } = useTranslation('common')
  graphql`
    fragment bookFeatureFields on SanityProduct {
      bookFeature {
        numberOfPages
        illustrators {
          ...profilePreviewFields
        }
        authors {
          ...profilePreviewFields
        }
        scriptwriters {
          ...profilePreviewFields
        }
      }
    }
  `
  return (
    <div>
      {numberOfPages && (
        <Text>
          {t('shop:number_of_pages')} : {numberOfPages}
        </Text>
      )}
      {illustrators && illustrators.length > 0 && (
        <Text>
          {t('shop:illustrators')} : {profilesPreviewer(illustrators)}
        </Text>
      )}
      {authors && authors.length > 0 && (
        <Text>
          {t('shop:authors')} : {profilesPreviewer(authors)}
        </Text>
      )}
      {scriptwriters && scriptwriters.length > 0 && (
        <Text>
          {t('shop:scriptwriters')} : {profilesPreviewer(scriptwriters)}
        </Text>
      )}
    </div>
  )
}

const profilesPreviewer = (profiles) =>
  profiles &&
  profiles
    .map((p) => <ProfilePreview key={p.id} {...p} showAvatar={false} />)
    .reduce((acc, el) => {
      return acc === null ? [el] : [...acc, ', ', el]
    }, null)
