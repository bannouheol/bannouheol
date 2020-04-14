/** @jsx jsx */
import { jsx, Input, Flex } from "theme-ui"
import { connectSearchBox } from "react-instantsearch-dom"
import { IoMdSearch } from "react-icons/io"

export const SearchBox = connectSearchBox(({ refine, ...opts }) => (
  <Flex as="form" sx={{ flexDirection: "row-reverse", alignItems: "center", bg: "white", borderRadius: 4, pl: 2 }}>
    <Input
      type="text"
      placeholder="Rechercher"
      aria-label="Rechercher"
      onChange={(e) => refine(e.target.value)}
      sx={{ bg: "white", border: 0, width: "full", color: "text" }}
      {...opts}
    />
    <IoMdSearch size={24} sx={{ color: "text" }} />
  </Flex>
))
