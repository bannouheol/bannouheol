/** @jsx jsx */

import { jsx, Link, Flex, Box, Styled } from 'theme-ui'
//import { Link } from "./Link"
import { useTranslation } from 'react-i18next'
//import { useStaticQuery, graphql } from "gatsby"
import { Mailchimp } from './Mailchimp'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

//const FooterLink = (props) => <Link sx={{ variant: "links.nav" }} {...props} />

export const FooterFirst = () => {
  const {
    t,
    //i18n: { language },
  } = useTranslation('common')
  /*const data = useStaticQuery(graphql`
    query FooterFirstQuery {
    }
  `)
  */

  return (
    <div
      sx={{
        variant: 'layout.footerFirst',
      }}
    >
      <Flex sx={{ width: 'full', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
        <Box>
          <Mailchimp />
        </Box>
        <Box mt={[3, 0]}>
          <Styled.h4>{t('follow_us')}</Styled.h4>
          <a href="https://facebook.com/bannouheol" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={48} />
          </a>
          <a href="https://instagram.com/bannouheol" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={48} />
          </a>
        </Box>
      </Flex>
    </div>
  )
}
