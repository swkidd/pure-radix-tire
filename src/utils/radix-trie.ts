
import { isEqual } from 'lodash'

export interface RadixTrie {
  data: string,
  children: RadixTrie[],
}

const cons = (data : string, children : RadixTrie[]) : RadixTrie => {
  return { data, children }
}

export const empty : RadixTrie = cons('', [])

export const equal = (t1 : RadixTrie, t2 : RadixTrie) : boolean => isEqual(t1, t2)

const recAdd = (s: string, children : RadixTrie[]) : RadixTrie[] => {
  if (s.length === 0) return children;

  const matchArray = children.filter(t => t.data[0] === s[0])
  if (matchArray.length === 0) {
      return [...children, cons(s, [])]
  }
  const match = matchArray[0]
  const matchData = match.data

  let i = 0;
  while (i < s.length && i < matchData.length && s[i] === matchData[i]) ++i
  const similarityLength = i
  const similarData = s.substr(0, similarityLength)
  const k = (newChildren: RadixTrie[]) => {
    return [...children.filter(t => t.data != matchData), cons(similarData, newChildren)]
  }

  if (similarityLength == s.length) {
    return k(recAdd(matchData.substr(similarityLength), match.children))
  } else if (similarityLength == matchData.length) {
    return k(recAdd(s.substr(similarityLength), match.children))
  } 
  return k(recAdd(s.substr(similarityLength), 
    recAdd(matchData.substr(similarityLength), match.children)))
}

export const add = (s: string, trie: RadixTrie) : RadixTrie => cons('', recAdd(s, trie.children))

const printLevel = (level: number, children: RadixTrie[]) : string => {
  if (children.length == 0) return '';
  return children.map(t => 
    Array(level).join('\t') + 'data: ' + t.data + '\n' + printLevel(level + 1, t.children)
  ).join('\n')
}
const print = (t: RadixTrie) => { return '*:\n' + printLevel(2, t.children) }