/** @jsx jsx */
import { jsx, Box, Styled, Input, Button } from "theme-ui"
import { useState } from "react"
//import addToMailchimp from "gatsby-plugin-mailchimp"

export const Mailchimp = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(email)
    /*
    addToMailchimp(email)
      .then((data) => {
        alert(data.result)
      })
      .catch((error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
      })
      */
  }

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value)
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Styled.h4>Inscrivez-vous à la newsletter !</Styled.h4>
      <Input
        sx={{ variant: "inputs.inline" }}
        placeholder="Votre adresse email..."
        name="email"
        type="email"
        onChange={handleEmailChange}
        mb={3}
      />
      <Button>Inscription</Button>
    </Box>
  )
}
