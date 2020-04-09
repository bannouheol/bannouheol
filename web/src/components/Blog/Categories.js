import React from "react"
import { Link } from "../Link"
import { useTranslation } from "react-i18next"

export const Categories = ({ categories }) => {
  const {
    t,
    //i18n: { language },
  } = useTranslation()
  return (
    <div>
      {categories && categories.length && (
        <div>
          <h3>Categories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>
                <Link to={`/${t("blog:slug")}/${t("blog:category_slug")}/${category.slug.current}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
