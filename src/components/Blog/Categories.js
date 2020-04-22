import React from "react"
//import { useTranslation } from "react-i18next"
import { graphql } from "gatsby"
import { CategoryPreview } from "./CategoryPreview"

export const Categories = ({ categories }) => {
  /*
  const {
    t,
    //i18n: { language },
  } = useTranslation()
  */
  graphql`
    fragment blogCategoryFields on SanityBlogCategory {
      ...blogCategoryPreviewFields
    }
  `
  return (
    <div>
      {categories && categories.length && (
        <div>
          <h3>Categories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryPreview {...category} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
