/** @jsx jsx */
import { jsx, Button } from "theme-ui"
import { useTranslation } from "react-i18next"
import { IoIosAdd } from "react-icons/io"

export const AddToCart = ({
  id,
  title,
  price,
  url,
  description,
  image,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <Button
      className="snipcart-add-item"
      data-item-id={id}
      data-item-name={title.translate}
      data-item-price={price}
      data-item-url={url}
      data-item-description={description}
      data-item-image={image}
      {...props}
    >
      <IoIosAdd />
      {t("shop:add_to_cart")}
    </Button>
  )
}
