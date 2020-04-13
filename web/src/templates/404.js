/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Layout } from "../components/Layout"
import SEO from "../components/SEO"

import { useTranslation } from "react-i18next"

const NotFoundPage = (props) => {
  const { t } = useTranslation("common")
  return (
    <Layout {...props}>
      <SEO title={"404: " + t("error.notFound")} />
      <Styled.h1>{t("error.notFound")}</Styled.h1>
      <p>{t("error.notFoundMessage")}</p>
    </Layout>
  )
}

export default NotFoundPage
