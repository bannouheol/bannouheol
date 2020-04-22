/** @jsx jsx */
import { jsx, Grid } from "theme-ui"
import { PostPreview } from "./PostPreview"

export const Posts = ({ nodes }) => {
  return (
    <Grid
      sx={{
        listStyle: "none",
        gridGap: 1,
        gridTemplateColumns: ["1fr 1fr", " repeat(7, 256px)"],
      }}
    >
      {nodes && nodes.map((post) => <PostPreview key={post.id} {...post} />)}
    </Grid>
  )
}
