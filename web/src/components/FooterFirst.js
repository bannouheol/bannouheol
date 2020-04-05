/** @jsx jsx */

import { jsx, Grid, Box } from "theme-ui"
//import { Link } from "./Link"
//import { useTranslation } from "react-i18next"
//import { useStaticQuery, graphql } from "gatsby"
import { Mailchimp } from "./Mailchimp"

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
      <Grid gap={2} columns={[1, "1fr 1fr"]}>
        <Box>
          <Mailchimp />
        </Box>
        <Box></Box>
      </Grid>
    </div>
  )
}
