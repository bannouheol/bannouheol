/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect, useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, Configure, Index, InfiniteHits, connectStateResults } from "react-instantsearch-dom"
import { SearchBox } from "./SearchBox"
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
    <div ref={ref} sx={{ width: "full", mt: [0, 0, 0, 2] }}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Configure hitsPerPage={4} />
        <SearchBox onFocus={() => setFocus(true)} {...{ collapse, focus }} />
        <div
          //show={query && query.length > 0 && focus}
          //asGrid={hitsAsGrid}
          sx={{
            display: query && query.length > 0 && focus ? "grid" : "none",
            maxHeight: "80vh",
            overflow: "scroll",
            overflowX: "hidden",
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
                <InfiniteHits
                  hitComponent={hitComps[hitComp](() => setFocus(false), language)}
                  translations={{
                    loadPrevious: "Résultats précédents",
                    loadMore: "Résultats suivants",
                  }}
                />
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
  <span sx={{ display: "inline-block", textAlign: "right" }}>
    Recherche propulsée par {` `}
    <a href="https://algolia.com">Algolia</a>
  </span>
)
