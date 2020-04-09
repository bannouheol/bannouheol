import React from "react"
import { PostPreview } from "./PostPreview"

export const Posts = ({ nodes }) => {
  return <>{nodes && nodes.map((post) => <PostPreview key={post.id} {...post} />)}</>
}
