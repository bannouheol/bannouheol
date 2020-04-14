/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect, useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, Index, Hits, SearchBox, connectStateResults } from "react-instantsearch-dom"

//import Input from "./Input"
import { FaAlgolia as Algolia } from "react-icons/fa"
import * as hitComps from "./hitComps"

const Results = connectStateResults(({ searchState: state, searchResults: res, children }) =>
  res && res.nbHits > 0 ? children : state.query ? `No results for '${state.query}'` : null
)
const Stats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)
const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = (event) => ref.current && !ref.current.contains(event.target) && handler()
  useListenerOn(events, detectClickOutside)
}

const useEscKey = (handler) => {
  const detectEscKey = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        handler()
      }
    },
    [handler]
  )
  useListenerOn([`keydown`], detectEscKey)
}

const useListenerOn = (events, detection) => {
  useEffect(() => {
    for (const event of events) document.addEventListener(event, detection, false)
    return () => {
      for (const event of events) document.removeEventListener(event, detection, false)
    }
  })
}

export default function Search({ indices, collapse }) {
  const {
    //t,
    i18n: { language },
  } = useTranslation("common")
  const ref = useRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const algoliaClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
  const searchClient = {
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0,
          })),
        })
      }

      return algoliaClient.search(requests)
    },
  }
  useClickOutside(ref, () => setFocus(false))
  useEscKey(() => setFocus(false))
  return (
    <div ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocus(true)} {...{ collapse, focus }} />
        <div
          //show={query && query.length > 0 && focus}
          //asGrid={hitsAsGrid}
          sx={{
            display: query && query.length > 0 && focus ? "grid" : "none",
            maxHeight: "80vh",
            overflow: "scroll",
            zIndex: 2,
            ":-webkit-overflow-scrolling": "touch",
            boxShadow: "0px 10px 10px rgba(0, 0, 0, .225)",
            borderRadius: 3,
            position: "absolute",
            right: "2rem",
            top: "2rem",
            width: "80vw",
            maxWidth: "30em",
            padding: 2,
            color: "text",
            bg: "white",
            ul: {
              listStyle: "none",
            },
            mark: {
              color: "white",
              bg: "secondary",
            },
            header: {
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            },
          }}
        >
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <header>
                <h6>{title}</h6>
                <Stats />
              </header>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false), language)} />
              </Results>
            </Index>
          ))}
          <PoweredBy />
        </div>
      </InstantSearch>
    </div>
  )
}

const PoweredBy = () => (
  <span>
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
)
