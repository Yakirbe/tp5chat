import React, { useState, useEffect, useRef } from 'react'
import { dialogSteps, DialogStep } from './data/dialogSteps'
import { TextMessage, ImageMessage, ActionButtons, SpinnerMessage, ScreenshotMessage, TableMessage } from './components/messages'
import { ChatMessage, createMessage, Speaker } from './types/messages'
import screenCapture from './utils/screenCapture'
import './App.css'

function App() {
  const [stepIndex, setStepIndex] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (stepIndex >= dialogSteps.length) return
    console.log('Showing step:', stepIndex)

    const step = dialogSteps[stepIndex]
    const showStep = async () => {
      const newMessages = await createChatMessagesFromStep(step)
      if (stepIndex === 0) {
        setMessages(newMessages)
      } else {
        setMessages(prev => [...prev, ...newMessages])
      }

      if (!step.waitForKeyPress && step.type !== 'spinner') {
        setTimeout(() => setStepIndex(stepIndex + 1), 1000)
      }
    }

    showStep()
  }, [stepIndex])

  const handleKeyPress = () => {
    const step = dialogSteps[stepIndex]
    if (step?.waitForKeyPress) {
      setStepIndex(stepIndex + 1)
    }
  }

  const handleActionButtonClick = (choice: string) => {
    setStepIndex(stepIndex + 1)
  }

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [stepIndex])

  const createChatMessagesFromStep = async (step: DialogStep): Promise<ChatMessage[]> => {
    console.log('Creating messages for step:', step)
    const messages: ChatMessage[] = []

    if (step.type === 'screenshot') {
      messages.push(createMessage.spinner('Taking screenshot...'))
      try {
        const result = await screenCapture.captureFrame()
        if (result) {
          messages[messages.length - 1] = createMessage.screenshot(
            result.image,
            result.width,
            result.height
          )
        }
      } catch (error) {
        console.error('Failed to capture screenshot:', error)
      }
    } else if (step.type === 'spinner') {
      messages.push(createMessage.spinner(step.message || 'Loading...'))
    } else {
      if (step.message) {
        messages.push(createMessage.text(step.speaker as Speaker, step.message))
      }
      if (step.type === 'actionButtons' && step.actionButtons) {
        messages.push(createMessage.actionButtons(step.actionButtons))
      }
    }

    return messages
  }

  const renderMessage = (message: ChatMessage) => {
    switch (message.type) {
      case 'text':
        return <TextMessage key={message.id} message={message} />
      case 'image':
        return <ImageMessage key={message.id} message={message} />
      case 'screenshot':
        return <ScreenshotMessage key={message.id} message={message} />
      case 'action_buttons':
        return (
          <ActionButtons 
            key={message.id} 
            message={message} 
            onAction={handleActionButtonClick} 
          />
        )
      case 'spinner':
        const spinnerStep: DialogStep = {
          speaker: 'System',
          message: message.text,
          type: 'spinner',
          duration: message.duration
        };
        return <SpinnerMessage 
          key={message.id} 
          message={spinnerStep}
          onComplete={() => {
            setMessages(prev => prev.filter(m => m.id !== message.id));
            setStepIndex(prev => prev + 1);
          }}
        />
      case 'table':
        return <TableMessage key={message.id} message={message} />
      default:
        return null
    }
  }

  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat-header">
          <h2>AI Support Assistant</h2>
          <div className="powered-by">Powered by Tier.5</div>
        </div>
        <div 
          className="messages" 
          ref={messagesContainerRef}
          style={{ 
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 200px)',
            scrollBehavior: 'smooth'
          }}
        >
          {messages.map(message => renderMessage(message))}
          <div ref={messagesEndRef} style={{ float: 'left', clear: 'both' }} />
        </div>
        <div className="input-form">
          <div className="key-press-hint">
            {dialogSteps[stepIndex]?.waitForKeyPress && (
              "Press any key to continue..."
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 