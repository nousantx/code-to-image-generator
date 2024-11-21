const parseCode = (codeString) => {
  const parts = []
  let currentPart = ''
  let currentType = null
  let inQuotes = false
  let inTag = false
  let inComment = false
  let inTemplateLiteral = false

  const keywords = [
    'const',
    'let',
    'var',
    'function',
    'return',
    'if',
    'else',
    'for',
    'while',
    'class',
    'import',
    'export'
  ]
  const operators = [
    '+',
    '-',
    '*',
    '/',
    '=',
    '==',
    '===',
    '!=',
    '!==',
    '<',
    '>',
    '<=',
    '>=',
    '&&',
    '||'
  ]
  const punctuation = [',', ';', ':', '(', ')', '[', ']', '{', '}']

  const pushPart = () => {
    if (currentPart) {
      if (!currentType) {
        if (keywords.includes(currentPart)) {
          currentType = 'keyword'
        } else if (!isNaN(Number(currentPart))) {
          currentType = 'number'
        } else {
          currentType = 'var'
        }
      }
      parts.push({ type: currentType, value: currentPart })
      currentPart = ''
      currentType = null
    }
  }

  for (let i = 0; i < codeString.length; i++) {
    const char = codeString[i]
    const nextChar = codeString[i + 1]

    if (inComment) {
      if (char === '*' && nextChar === '/') {
        currentPart += '*/'
        parts.push({ type: 'comment', value: currentPart })
        currentPart = ''
        inComment = false
        i++
      } else {
        currentPart += char
      }
      continue
    }

    if (char === '/' && nextChar === '*') {
      pushPart()
      currentPart = '/*'
      inComment = true
      i++
      continue
    }

    if (char === '<' && !inQuotes && !inTemplateLiteral) {
      pushPart()
      parts.push({ type: 'var', value: '<' })
      inTag = true
      continue
    }

    if (char === '>' && !inQuotes && !inTemplateLiteral) {
      pushPart()
      parts.push({ type: 'var', value: '>' })
      inTag = false
      continue
    }

    if (inTag && char === ' ' && !inQuotes) {
      pushPart()
      parts.push({ type: 'content', value: ' ' })
      continue
    }

    if (inTag && char === '=' && !inQuotes) {
      pushPart()
      parts.push({ type: 'var', value: '=' })
      continue
    }

    if (char === '`') {
      if (inTemplateLiteral) {
        currentPart += char
        parts.push({ type: 'template-literal', value: currentPart })
        currentPart = ''
        inTemplateLiteral = false
      } else {
        pushPart()
        currentPart = char
        inTemplateLiteral = true
      }
      continue
    }

    if (inTemplateLiteral) {
      if (char === '$' && nextChar === '{') {
        currentPart += '${'
        i++
      } else {
        currentPart += char
      }
      continue
    }

    if (char === '"' || char === "'") {
      if (inQuotes) {
        currentPart += char
        parts.push({ type: 'string', value: currentPart })
        currentPart = ''
        inQuotes = false
      } else {
        pushPart()
        currentPart = char
        inQuotes = true
      }
      continue
    }

    if (!inQuotes && !inTag && !inTemplateLiteral) {
      if (operators.includes(char + nextChar)) {
        pushPart()
        parts.push({ type: 'operator', value: char + nextChar })
        i++
        continue
      }
      if (operators.includes(char)) {
        pushPart()
        parts.push({ type: 'operator', value: char })
        continue
      }
      if (punctuation.includes(char)) {
        pushPart()
        parts.push({ type: 'punctuation', value: char })
        continue
      }
    }

    if (inTag && !currentType && char !== ' ') {
      currentType = 'tag'
    }

    currentPart += char
  }

  pushPart()

  return parts
}

const CodeBlock = ({ code }) => {
  const parts = parseCode(code)

  return (
    <div className="code-block">
      {parts.map((part, index) => (
        <span key={index} className={part.type}>
          {part.value}
        </span>
      ))}
    </div>
  )
}

export default CodeBlock
