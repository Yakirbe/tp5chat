export interface CaptureResult {
  type: 'image';
  image: string;
  width: number;
  height: number;
}

class ScreenCapture {
  private static instance: ScreenCapture;
  private captures: Map<string, CaptureResult> = new Map();
  private videoStream: MediaStream | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance(): ScreenCapture {
    if (!ScreenCapture.instance) {
      ScreenCapture.instance = new ScreenCapture();
    }
    return ScreenCapture.instance;
  }

  private async initializeCapture() {
    if (this.videoStream && this.videoElement) {
      return; // Already initialized
    }

    if (this.initializationPromise) {
      await this.initializationPromise; // Wait for existing initialization
      return;
    }

    this.initializationPromise = (async () => {
      try {
        // Request screen capture permission once
        this.videoStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false
        });

        // Create video element for the stream
        this.videoElement = document.createElement('video');
        this.videoElement.srcObject = this.videoStream;
        this.videoElement.style.display = 'none';
        document.body.appendChild(this.videoElement);

        // Handle stream end
        this.videoStream.getVideoTracks()[0].addEventListener('ended', () => {
          this.stopCapture();
        });

        // Start playing the video
        await this.videoElement.play();
      } catch (error) {
        console.error('Failed to initialize screen capture:', error);
        this.stopCapture();
        throw error;
      } finally {
        this.initializationPromise = null;
      }
    })();

    await this.initializationPromise;
  }

  private stopCapture() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
    if (this.videoElement) {
      this.videoElement.remove();
      this.videoElement = null;
    }
  }

  async captureFrame(options: { filename?: string } = {}): Promise<CaptureResult | null> {
    const { filename = `capture-${Date.now()}` } = options;

    try {
      await this.initializeCapture();

      if (!this.videoElement) {
        throw new Error('Video element not initialized');
      }

      // Create canvas with video dimensions
      const canvas = document.createElement('canvas');
      canvas.width = this.videoElement.videoWidth;
      canvas.height = this.videoElement.videoHeight;

      // Draw current video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(this.videoElement, 0, 0);
      }

      // Convert to data URL
      const imageData = canvas.toDataURL('image/png');

      const result: CaptureResult = {
        type: 'image',
        image: imageData,
        width: canvas.width,
        height: canvas.height
      };

      // Store the capture
      this.captures.set(filename, result);

      return result;
    } catch (error) {
      console.error('Error capturing frame:', error);
      return null;
    }
  }

  getCapturedImage(filename: string): CaptureResult | undefined {
    return this.captures.get(filename);
  }

  getAllCaptures(): Map<string, CaptureResult> {
    return new Map(this.captures);
  }

  clearCapture(filename: string): boolean {
    return this.captures.delete(filename);
  }

  clearAllCaptures(): void {
    this.captures.clear();
  }

  // Clean up resources
  cleanup() {
    this.stopCapture();
    this.clearAllCaptures();
  }
}

export const screenCapture = ScreenCapture.getInstance();
export default screenCapture; 