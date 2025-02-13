'use client'

import { useChat } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from 'react'

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useChat()
  const [message, setMessage] = useState(input)

  // 处理多余空行和格式的函数
  const formatContent = (content: string) => {
    // 移除多余的空行
    let formatted = content
      .replace(/\n\s*\n/g, '\n\n') // 将连续的换行符替换为两个换行符
      .trim() // 移除开头和结尾的空白

    // 处理列表缩进
    formatted = formatted.replace(/^\s*\*\s+/gm, '• ') // 将无序列表符号替换为点符号
    formatted = formatted.replace(/^\s*\d+\.\s+/gm, (match) => {
      return match.replace(/^\s*\d+\./, '•') // 将有序列表符号替换为点符号
    })

    return formatted
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        event.preventDefault()
        setMessage((prev) => prev + '\n')
      } else {
        event.preventDefault()
        originalHandleSubmit()
        setMessage('')
      }
    }
  }

  return (
    <>
      <div className='flex flex-col w-full max-w-3xl py-24 mx-auto stretch'>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap mb-4 flex ${
              m.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] text-left p-4 rounded-lg ${
                m.role === 'assistant'
                  ? 'bg-gray-100 dark:bg-zinc-800'
                  : 'bg-blue-100 dark:bg-blue-900'
              }`}
            >
              {m.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    code({ node, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !className?.includes('inline') && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag='div'
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...props} className={className}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {formatContent(m.content)}
                </ReactMarkdown>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className='fixed bottom-0 w-full p-6 bg-background'
        style={{ transition: 'background-color 0.8s ease' }}
      >
        <form onSubmit={originalHandleSubmit} className='max-w-3xl mx-auto'>
          <textarea
            className='w-full p-2 border rounded-2xl h-[100px] resize-none bg-gray-100 dark:bg-gray-900'
            value={message}
            placeholder='Say something...'
            onChange={(e) => {
              setMessage(e.target.value)
              handleInputChange(e)
            }}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
    </>
  )
}
