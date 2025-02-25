"use client"
import { useState, useEffect } from 'react';
import { Document as PDFDocument, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFPagePreviewProps {
  url: string;
  page: number;
  width?: number;
}

export function PDFPagePreview({ url, page, width = 200 }: PDFPagePreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  return (
    <div className="relative w-full h-full min-h-[200px] bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500">
          <p className="text-sm">Failed to load PDF</p>
        </div>
      )}
      
      <PDFDocument
        file={url}
        onLoadSuccess={() => setLoading(false)}
        onLoadError={(error: Error) => {
          console.error("PDF load error:", error);
          setError(error);
          setLoading(false);
        }}
      >
        <Page 
          pageNumber={page} 
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </PDFDocument>
    </div>
  );
}
