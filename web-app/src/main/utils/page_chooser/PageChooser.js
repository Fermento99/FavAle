import React from 'react'
import NumberButton, {NormalButton} from './NumberButton'

const getSurr = n => {
  return [(n - 3 > 0 ? n - 3 : null), (n - 2 > 0 ? n - 2 : null), (n - 1 > 0 ? n - 1 : null), n, n + 1, n + 2, n + 3]
}

export default function PageChooser({ curr, setPage }) {
  const pages = getSurr(curr)
  return (
    <div>
      <NormalButton onClick={() => setPage(curr-1 < 1 ? 1 : curr-1)}>&lt;&lt;</NormalButton>
      {pages.map(page => page ? <NumberButton key={page} onclick={() => setPage(page)} curr={page === curr} page={page} /> : null)}
      <NormalButton onClick={() => setPage(curr+1)}>&gt;&gt;</NormalButton>
  </div>
  )
}
