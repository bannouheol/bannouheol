import React from "react"
import { Link } from "../Link"
import { useTranslation } from "react-i18next"

export const Categories = ({ nodes }) => {
  const {
    t,
    //i18n: { language },
  } = useTranslation()
  return (
    <div>
      <h3>Categories</h3>
      <ul>
        {nodes.map((category) => (
          <li key={category._id}>
            <Link to={`/${t("blog:slug")}/${t("blog:category_slug")}/${category.slug.translate}`}>{category.title.translate}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
