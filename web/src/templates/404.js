import React from "react"
import { Layout } from "../components/Layout"
import SEO from "../components/seo"

import { useTranslation } from "react-i18next"

const NotFoundPage = () => {
  const { t } = useTranslation("common")
  return (
    <Layout>
      <SEO title={"404: " + t("notFound")} />
      <h1>{t("notFound")}</h1>
      <p>{t("notFoundMessage")}</p>
    </Layout>
  )
}

export default NotFoundPage
