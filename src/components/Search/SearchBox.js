/** @jsx jsx */
import { jsx, Input, Flex } from 'theme-ui'
import { connectSearchBox } from 'react-instantsearch-dom'
import { IoMdSearch } from 'react-icons/io'
import { useTranslation } from 'react-i18next'

export const SearchBox = connectSearchBox(({ refine, ...opts }) => {
  const {
    t,
    // i18n: { language },
  } = useTranslation('common')
  return (
    <Flex
      as="form"
      sx={{
        bg: 'white',
        borderRadius: 4,
        width: 'full',
        maxWidth: '320px',
        touchAction: 'none',
      }}
    >
      <label
        htmlFor="search"
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          pl: 2,
          width: 'full',
          touchAction: 'none',
        }}
      >
        <Input
          name="search"
          id="search"
          type="text"
          placeholder={t('find')}
          aria-label={t('find')}
          onChange={(e) => refine(e.target.value)}
          autocomplete="nope"
          sx={{ bg: 'white', border: 0, color: 'text', fontSize: '16px', touchAction: 'none' }}
          {...opts}
        />
        <IoMdSearch size={32} sx={{ color: 'text' }} />
      </label>
    </Flex>
  )
})
