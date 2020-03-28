/** @jsx jsx */
import { jsx, Text, Box } from "theme-ui"
import PortableText from "../PortableText"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"
//import { Categories } from "./Categories"
import { Link } from "../Link"
import { translateRaw } from "../../lib/helpers"
import { BookFeature } from "./BookFeature"
import { ProfilePreview } from "./ProfilePreview"
import { AddToCart } from "./AddToCart"

export const Product = ({
  id,
  _rawTitle,
  _rawSlug,
  _rawBody,
  reference,
  categories,
  collection,
  defaultProductVariant,
  traductors,
  bookFeature,
  releaseDate,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const [title, slug, body] = translateRaw(
    [_rawTitle, _rawSlug, _rawBody],
    language
  )
  return (
    <article>
      {defaultProductVariant &&
        defaultProductVariant.images &&
        defaultProductVariant.images.map((i) => (
          <div sx={{ maxWidth: "300" }}>
            <Img fluid={i.asset.fluid} />
          </div>
        ))}
      <div>
        <div>
          <h1>{title}</h1>
          {defaultProductVariant.inStock && (
            <Box sx={{ variant: "boxes.price" }}>
              {defaultProductVariant.price.formatted}
            </Box>
          )}
          {body && <PortableText blocks={body} />}
          <hr />
          {traductors && <strong>Traducteurs</strong>}
          {traductors &&
            traductors.map((t) => (
              <ProfilePreview key={t.id} {...t} showAvatar={false} />
            ))}
          <BookFeature {...bookFeature} />
          <hr />
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
