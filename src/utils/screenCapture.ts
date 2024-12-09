declare class ImageCapture {
  constructor(track: MediaStreamTrack);
  grabFrame(): Promise<ImageBitmap>;
}

import { ScreenCapture } from '../types';

export async function captureScreen(): Promise<ScreenCapture | null> {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'monitor'
      }
    });

    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const bitmap = await imageCapture.grabFrame();

    // Create a canvas to convert the bitmap to a data URL
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext('2d');
    context?.drawImage(bitmap, 0, 0);

    const capture: ScreenCapture = {
      imageUrl: canvas.toDataURL('image/png'),
      timestamp: Date.now(),
      dimensions: {
        width: bitmap.width,
        height: bitmap.height
      }
    };

    // Stop all tracks
    stream.getTracks().forEach(track => track.stop());
    return capture;
  } catch (error) {
    console.error('Error capturing screen:', error);
    return null;
  }
} 