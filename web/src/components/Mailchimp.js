/** @jsx jsx */
import { jsx, Box, Styled, Text, Input, Button } from "theme-ui"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import addToMailchimp from "gatsby-plugin-mailchimp"

export const Mailchimp = () => {
  const {
    t,
    //i18n: { language },
  } = useTranslation("common")
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    addToMailchimp(email)
      .then((data) => {
        alert(data.result)
      })
      .catch((error) => {
        alert(error)
        // Errors in here are client side
        // Mailchimp always returns a 200
      })
  }

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value)
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Styled.h4 sx={{ mb: 0 }}>{t("mailing_subscribe")}</Styled.h4>
      <Text sx={{ mb: 2 }}>{t("mailing_receive_offers")}</Text>
      <Input
        sx={{ variant: "inputs.inline" }}
        placeholder={t("mailing_your_mail")}
        name="email"
        type="email"
        onChange={handleEmailChange}
        mb={3}
      />
      <Button>{t("mailing_submit")}</Button>
    </Box>
  )
}
