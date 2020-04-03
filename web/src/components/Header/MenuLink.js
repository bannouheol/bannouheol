/** @jsx jsx */

import { Link } from "../Link"
import { jsx } from "theme-ui"

export const MenuLink = (props) => (
  <Link
    {...props}
    activeClassName="active"
    sx={{
      variant: "links.header",
    }}
  />
)
