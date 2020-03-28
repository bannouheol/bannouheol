/** @jsx jsx */
import PortableText from "../PortableText"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"
//import { Categories } from "./Categories"
import { Link } from "../Link"
import { jsx, Text, Button } from "theme-ui"
//import { toPlainText } from "../../lib/helpers"
import { BookFeature } from "./BookFeature"
import { PersonPreview } from "./PersonPreview"
import { AddToCart } from "./AddToCart"

export const Product = ({
  id,
  title,
  slug,
  reference,
  _rawBody,
  categories,
  collection,
  defaultProductVariant,
  traductor,
  bookFeature,
  releaseDate,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  return (
    <article>
      {defaultProductVariant &&
        defaultProductVariant.images &&
        defaultProductVariant.images.map((i) => (
          <div>
            <Img fluid={i.asset.fluid} />
          </div>
        ))}
      <div>
        <div>
          <h1>{title.translate}</h1>
          {_rawBody && _rawBody[language] && (
            <PortableText blocks={_rawBody[language]} />
          )}
          <hr />
          {traductor && <strong>Traducteurs</strong>}
          {traductor &&
            traductor.map((t) => (
              <PersonPreview key={t.id} {...t} showAvatar={false} />
            ))}
          <BookFeature {...bookFeature} />
          <hr />
          <Text>
            {defaultProductVariant.inStock &&
              defaultProductVariant.price.formatted}
          </Text>
          {defaultProductVariant.inStock && (
            <AddToCart
              id={id}
              title={title}
              price={defaultProductVariant.price.value}
              url={`/${collection.slug.translate}/${slug.translate}`}
              description={`${collection.title.translate} - ${reference}`}
              image={
                defaultProductVariant.images &&
                defaultProductVariant.images[0].asset.fluid.src
              }
            />
          )}
          {!defaultProductVariant.inStock && (
            <Text>{t("shop:out_of_stock")}</Text>
          )}
        </div>
        <aside>
          {releaseDate && (
            <p>{t("shop:released_on", { date: new Date(releaseDate) })}</p>
          )}
          <div>
            <h3>Collection</h3>
            <p>
              <Link to={`/${collection.slug.translate}`}>
                {collection.title.translate}
              </Link>
            </p>
            <h3>Catégories</h3>
            <ul>
              {categories &&
                categories
                  .map((c) => (
                    <li>
                      <Link to={`/${c.slug.translate}`}>
                        {c.title.translate}
                      </Link>
                    </li>
                  ))
                  .reduce((acc, el) => {
                    return acc === null ? [el] : [...acc, ", ", el]
                  }, null)}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  )
}
