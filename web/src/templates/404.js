import React from "react"
import { Layout } from "../components/Layout"
import SEO from "../components/seo"

import { useTranslation } from "react-i18next"

const NotFoundPage = (props) => {
  const { t } = useTranslation("common")
  return (
    <Layout {...props}>
      <SEO title={"404: " + t("error.notFound")} />
      <h1>{t("error.notFound")}</h1>
      <p>{t("error.notFoundMessage")}</p>
    </Layout>
  )
}

export default NotFoundPage
