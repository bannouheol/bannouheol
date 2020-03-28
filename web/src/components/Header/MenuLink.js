/** @jsx jsx */
import { Link } from "../Link"
import { jsx, NavLink } from "theme-ui"

export const MenuLink = (props) => (
  <NavLink
    as={Link}
    {...props}
    activeClassName="active"
    px={3}
    sx={{
      color: "inherit",
      "&.active": {
        color: "red",
      },
    }}
  />
)
