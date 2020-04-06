/** @jsx jsx */
import { jsx, Button } from "theme-ui"
import { useTranslation } from "react-i18next"
import { IoIosCart } from "react-icons/io"

export const AddToCart = ({ id, title, price, url, description, image, discrete = false, ...props }) => {
  const { t } = useTranslation()
  return (
    <Button
      className="snipcart-add-item"
      data-item-id={id}
      data-item-name={title}
      data-item-price={price}
      data-item-url={url}
      data-item-description={description}
      data-item-image={image}
      variant={discrete ? "discrete" : "primary"}
      //sx={{ bg: "secondary", "&:hover": { bg: "tomato" } }}
      {...props}
    >
      {!discrete && <IoIosCart />}
      {discrete ? t("shop:buy") : t("shop:add_to_cart")}
    </Button>
  )
}
