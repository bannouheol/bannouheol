/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Layout } from '../components/Layout'
import SEO from '../components/SEO'
import { graphql } from 'gatsby'
import { GraphQLErrorList } from '../components/GraphQLErrorList'
import { toPlainText, translateRaw } from '../lib/helpers'
import PortableText from '../components/PortableText'
import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components/ContactForm'

const ContactPage = ({ data, errors, ...props }) => {
  const {
    //t,
    i18n: { language },
  } = useTranslation('common')
  const {
    page: { title, content },
  } = translateRaw(data, language)
  return (
    <Layout {...props}>
      {errors && <SEO title="GraphQL Error" />}
      {title && (
        <SEO
          title={title}
          description={content && toPlainText(content)}
          //image={product.image}
        />
      )}
      {errors && <GraphQLErrorList errors={errors} />}

      {title && <Styled.h1>{title}</Styled.h1>}
      {content && <PortableText blocks={content} />}
      <ContactForm />
    </Layout>
  )
}

export const query = graphql`
  query ContactPage($page: String) {
    page: sanityPage(id: { eq: $page }) {
      ...pageFields
    }
  }
`

export default ContactPage
