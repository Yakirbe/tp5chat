import React, { useEffect, useState } from 'react'
import screenCapture, { CaptureResult } from '../utils/screenCapture'
import './Screenshot.css'

interface ScreenshotProps {
  stepIndex: number;
  onCapture?: (result: CaptureResult) => void;
}

const Screenshot: React.FC<ScreenshotProps> = ({ 
  stepIndex, 
  onCapture 
}) => {
  const [screenshot, setScreenshot] = useState<CaptureResult | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    const capture = async () => {
      if (isCapturing) return
      
      setIsCapturing(true)
      try {
        const filename = `step-${stepIndex}`
        
        // Check if we already have this screenshot
        const existingCapture = screenCapture.getCapturedImage(filename)
        if (existingCapture) {
          setScreenshot(existingCapture)
          onCapture?.(existingCapture)
          return
        }

        // Take new screenshot from live feed
        const result = await screenCapture.captureFrame({ filename })
        if (result) {
          setScreenshot(result)
          onCapture?.(result)
        }
      } catch (error) {
        console.error('Failed to capture screenshot:', error)
      } finally {
        setIsCapturing(false)
      }
    }

    // Small delay to ensure user has time to position the window
    const timer = setTimeout(capture, 1000)
    return () => clearTimeout(timer)
  }, [stepIndex, onCapture])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stepIndex === 0) { // Only cleanup when the first screenshot component unmounts
        screenCapture.cleanup()
      }
    }
  }, [stepIndex])

  if (!screenshot) return null

  return (
    <div className="screenshot" style={{ maxWidth: screenshot.width }}>
      <img 
        src={screenshot.image} 
        alt={`Screenshot at step ${stepIndex}`}
        width={screenshot.width}
        height={screenshot.height}
        loading="lazy"
      />
      {isCapturing && (
        <div className="screenshot-overlay">
          <div className="screenshot-loading">Taking screenshot...</div>
        </div>
      )}
    </div>
  )
}

export default Screenshot 