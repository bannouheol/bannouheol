import React from "react"
import clientConfig from "../../client-config"
import BasePortableText from "@sanity/block-content-to-react"

const serializers = {
  types: {
    //authorReference: ({node}) => <span>{node.author.name}</span>,
    //localBlockContent:  ({node}) => {node._rawBody}
  },
  marks: {
    link: ({ children, mark }) => (
      <a href={mark.href} target={mark.blank === false ? "_self" : "_blank"} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

const PortableText = ({ blocks }) => (
  <BasePortableText blocks={blocks} serializers={serializers} {...clientConfig.sanity} />
)

export default PortableText
