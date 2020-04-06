/** @jsx jsx */

import { jsx, Link, Flex, Box, Styled } from "theme-ui"
//import { Link } from "./Link"
//import { useTranslation } from "react-i18next"
//import { useStaticQuery, graphql } from "gatsby"
import { Mailchimp } from "./Mailchimp"
import { FaFacebook, FaInstagram } from "react-icons/fa"

//const FooterLink = (props) => <Link sx={{ variant: "links.nav" }} {...props} />

export const FooterFirst = () => {
  /*const {
    t,
    i18n: { language },
  } = useTranslation("common")
  */
  /*const data = useStaticQuery(graphql`
    query FooterFirstQuery {
    }
  `)
  */

  return (
    <div
      sx={{
        variant: "layout.footerFirst",
      }}
    >
      <Flex sx={{ width: "full", justifyContent: "space-between", flexDirection: ["column", "column", "row"] }}>
        <Box>
          <Mailchimp />
        </Box>
        <Box mt={[3, 0]}>
          <Styled.h4>Suivez-nous sur les réseaux sociaux</Styled.h4>
          <Link href="https://facebook.com/bannouheol">
            <FaFacebook size={48} />
          </Link>
          <FaInstagram size={48} />
        </Box>
      </Flex>
    </div>
  )
}
