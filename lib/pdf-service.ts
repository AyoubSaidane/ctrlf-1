// PDF service to handle rendering pages as data URLs

export const configurePdfjs = async () => {
  if (typeof window !== 'undefined') {
    const pdfjs = await import('pdfjs-dist');
    console.log("Setting worker to:", `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    return pdfjs;
  }
  return null;
};

interface RenderPageOptions {
  url?: string;
  localPath?: string;
  base64Data?: string;
  page: number;
  scale: number;
}

// Helper function to convert base64 to ArrayBuffer
export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = window.atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return bytes.buffer;
};

export const renderPageToDataUrl = async ({ url, localPath, base64Data, page, scale }: RenderPageOptions): Promise<string> => {
  const pdfjs = await configurePdfjs();
  if (!pdfjs) throw new Error('PDF.js could not be initialized');

  try {
    let pdfDocument;
    
    if (base64Data) {
      // Handle base64 encoded data from API
      const arrayBuffer = base64ToArrayBuffer(base64Data);
      pdfDocument = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    } else if (localPath) {
      // Handle local file
      const response = await fetch(localPath);
      const buffer = await response.arrayBuffer();
      pdfDocument = await pdfjs.getDocument({ data: buffer }).promise;
    } else if (url) {
      // Handle remote URL
      pdfDocument = await pdfjs.getDocument({
        url,
        disableAutoFetch: true,
        disableStream: true,
      }).promise;
    } else {
      throw new Error('No PDF source provided');
    }

    const pdfPage = await pdfDocument.getPage(page);
    
    const viewport = pdfPage.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Failed to get canvas context');
    
    await pdfPage.render({
      canvasContext: context,
      viewport
    }).promise;

    return canvas.toDataURL();
  } catch (error) {
    console.error("Error rendering PDF:", error);
    throw error;
  }
};