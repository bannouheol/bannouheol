import React, {useState, useEffect, useCallback, useRef} from "react"
import {useTranslation} from "react-i18next"
import {InstantSearch, Index, Hits, SearchBox, connectStateResults} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import {Root, HitsWrapper, PoweredBy} from "./styles"
import Input from "./Input"
import * as hitComps from "./hitComps"

const Results = connectStateResults(({searchState: state, searchResults: res, children}) =>
  res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)
const Stats = connectStateResults(
  ({searchResults: res}) => res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
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

export default function Search({indices, collapse, hitsAsGrid}) {
  const {
    //t,
    i18n: {language},
  } = useTranslation("common")
  const ref = useRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
  useClickOutside(ref, () => setFocus(false))
  useEscKey(() => setFocus(false))
  return (
    <div ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        //searchState={{ query }}
        onSearchStateChange={({query}) => setQuery(query)}
      // root={{ Root, props: { ref } }}
      >
        <SearchBox onFocus={() => setFocus(true)} {...{collapse, focus}} />
        <HitsWrapper show={query && query.length > 0 && focus} asGrid={hitsAsGrid}>
          {indices.map(({name, title, hitComp}) => (
            <Index key={name} indexName={name}>
              <header>
                <h3>{title}</h3>
                <Stats />
              </header>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false), language)} />
              </Results>
            </Index>
          ))}
          <PoweredBy />
        </HitsWrapper>
      </InstantSearch>
    </div>
  )
}
