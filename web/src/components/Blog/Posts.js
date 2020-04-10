/** @jsx jsx */
import { jsx, Grid } from "theme-ui"
import { PostPreview } from "./PostPreview"

export const Posts = ({ nodes }) => {
  return (
    <Grid
      sx={{
        listStyle: "none",
        gridGap: 3,
        gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))",
        m: 0,
      }}
    >
      {nodes && nodes.map((post) => <PostPreview key={post.id} {...post} />)}
    </Grid>
  )
}
