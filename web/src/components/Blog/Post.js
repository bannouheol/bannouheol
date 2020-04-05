/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import PortableText from "../PortableText"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"
import { Categories } from "./Categories"
//import { Link } from "../Link"

export const Post = (props) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { _rawBody, categories, title, image, publishedAt } = props
  return (
    <article>
      {image && image.asset && (
        <div>
          <Img fluid={image.asset.fluid} />
        </div>
      )}
      <div>
        <div>
          <Styled.h1>{title.translate}</Styled.h1>
          {_rawBody && _rawBody[language] && <PortableText blocks={_rawBody[language]} />}
        </div>
        <aside>
          {publishedAt && <div>{t("blog:posted_at", { date: new Date(publishedAt) })}</div>}
          {categories && <Categories nodes={categories} />}
        </aside>
      </div>
    </article>
  )
}
