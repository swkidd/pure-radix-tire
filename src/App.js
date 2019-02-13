import React from 'react'
import './App.css'
import * as radixTrie from './utils/radix-trie.ts'
import { Trie } from './components/Trie'

const App = () => {
  const [words, setWords] = React.useState("こんにちわ")
  const [trie, setTrie] = React.useState(radixTrie.empty)

  const handleChange = (e) => {
    setWords(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let currentTrie = trie
    words.split(/\s+/).map(word => { currentTrie = radixTrie.add(word, currentTrie) }) 
    setTrie(currentTrie)
  }

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            onChange={handleChange}>
          </input>
        </form>
      </div>
      <Trie trie={trie}/>
    </div>
  )
}

export default App
