import React from "react"

export const GraphQLErrorList = ({ errors }) => (
  <div>
    <h1>GraphQL Error</h1>
    {errors.map((error) => (
      <pre key={error.message}>{error.message}</pre>
    ))}
  </div>
)
