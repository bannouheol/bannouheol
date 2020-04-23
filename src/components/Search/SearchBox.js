/** @jsx jsx */
import { jsx, Input, Flex } from 'theme-ui'
import { connectSearchBox } from 'react-instantsearch-dom'
import { IoMdSearch } from 'react-icons/io'

export const SearchBox = connectSearchBox(({ refine, ...opts }) => (
  <Flex
    as="form"
    sx={{
      bg: 'white',
      borderRadius: 4,
      width: 'full',
      maxWidth: '320px',
    }}
  >
    <label
      htmlFor="search"
      sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', pl: 2, width: 'full' }}
    >
      <Input
        name="search"
        id="search"
        type="text"
        placeholder="Rechercher"
        aria-label="Rechercher"
        onChange={(e) => refine(e.target.value)}
        autocomplete="off"
        sx={{ bg: 'white', border: 0, color: 'text' }}
        {...opts}
      />
      <IoMdSearch size={32} sx={{ color: 'text' }} />
    </label>
  </Flex>
))
