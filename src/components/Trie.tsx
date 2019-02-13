import React from 'react'
import './Trie.css'
import { RadixTrie } from '../utils/radix-trie'

export interface Props {
  trie: RadixTrie
}

export function Trie(props: Props) {
  return (
    <ul className="clt">
      {props.trie.data}
      <li>
        {props.trie.children.map((t, i) => <Trie key={i} trie={t} />)}
      </li>
    </ul>
  )
}