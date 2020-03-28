import React from "react"
import { PostPreview } from "./PostPreview"

export const Posts = ({ nodes }) => {
  return (
    <>
      {nodes.map((post) => (
        <PostPreview key={post.id} node={post} />
      ))}
    </>
  )
}
