/** @jsx jsx */
import { jsx, Styled, Alert, Box, Label, Input, Textarea, Button } from 'theme-ui'
import { useForm, ValidationError } from '@statickit/react'
import { useTranslation } from 'react-i18next'
//import { createClient, sendContactEmail } from '@statickit/functions'

export const ContactForm = () => {
  const {
    t,
    // i18n: { language },
  } = useTranslation('common')
  const [state, handleSubmit] = useForm('contactForm')
  if (state.succeeded) {
    return <Alert bg={'secondary'}>{t('contact_form_success')}</Alert>
  }
  // send email notification
  /*
  const client = createClient({ site: process.env.STATICKIT_SITEID })
  const form = document.getElementById('contactForm')
  if (state.submitting) {
    let data = new FormData(form)
    sendContactEmail(client, {
      subject: 'Message depuis le formulaire de contact sur bannouheol.com',
      fields: {
        email: data.get('email'),
        message: data.get('message'),
      },
    })
  }
  */

  return (
    <Box
      as="form"
      id="contactForm"
      onSubmit={handleSubmit}
      sx={{
        width: ['100%', '80%', '60%', '35%'],
        p: 3,
        border: '1px solid',
        bg: 'secondary',
        color: 'white',
      }}
    >
      <Styled.h3>{t('contact_form')}</Styled.h3>
      <Box mb={3} sx={{}}>
        <Label htmlFor="email">{t('your_mail')} :</Label>
        <Input id="email" type="email" name="email" sx={{ borderColor: 'white', borderRadius: 0 }} />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </Box>
      <Box mb={3} sx={{}}>
        <Label htmlFor="message">{t('your_message')} :</Label>
        <Textarea id="message" name="message" rows="6" mb={3} sx={{ borderColor: 'white', borderRadius: 0 }} />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </Box>
      <Button type="submit" disabled={state.submitting}>
        {t('write_us')}
      </Button>
    </Box>
  )
}
