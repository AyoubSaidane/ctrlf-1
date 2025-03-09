"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PDFPagePreview } from '@/components/pdf-page-preview';
import { Document } from '@/api/types/api';
import { Button } from '@/components/ui/button';

interface PdfPreviewModalProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
}

export function PdfPreviewModal({ document, isOpen, onClose }: PdfPreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(document?.page || 1);
  
  // Reset to the initial page when document changes
  useEffect(() => {
    if (document) {
      setCurrentPage(document.page);
    }
  }, [document]);

  if (!isOpen || !document) return null;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    // Allow going to the next page without an upper limit
    setCurrentPage(currentPage + 1);
  };

  const openFullDocument = () => {
    // Open the document at the specific page
    if (document.localPath) {
      // For local files, we might need a different approach depending on your app's architecture
      // This could open in a new tab if the file is accessible via URL, or use a custom viewer
      window.open(`${document.localPath}`, '_blank');
    } else {
      window.open(`${document.url}#page=${currentPage}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-blaTranscript_03_Orphan_Drug_Developmentck/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-[110vh] h-[90vh] flex flex-col relative">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 z-10"
          aria-label="Close"
        >
          <Image 
            src="/close.svg" 
            alt="Close" 
            width={24} 
            height={24} 
          />
        </button>
        
        {/* PDF Preview */}
        <div className="flex-1 p-8 overflow-auto">
          <PDFPagePreview 
            url={document.url} 
            localPath="/test/PDF_003_BCG-report-NYCHA-Key-Findings-and-Recommendations-8-15-12vFinal.pdf"
            page={currentPage} 
            width={1200} 
          />
        </div>
        
        {/* Document title */}
        <div className="px-8 py-2">
          <h3 className="font-semibold">{document.title}</h3>
          <p className="text-sm text-muted-foreground">
            Page {currentPage}
          </p>
        </div>
        
        {/* Bottom controls */}
        <div className="p-4 border-t flex items-center justify-center gap-4">
          <Button 
            onClick={handlePrevPage} 
            disabled={currentPage <= 1}
            variant="outline"
            className="p-2"
          >
            <Image 
              src="/left-arrow.svg" 
              alt="Previous page" 
              width={24} 
              height={24} 
            />
          </Button>
          
          <Button onClick={openFullDocument} className="px-4">
            Open Full Doc
          </Button>
          
          <Button 
            onClick={handleNextPage} 
            variant="outline"
            className="p-2"
          >
            <Image 
              src="/right-arrow.svg" 
              alt="Next page" 
              width={24} 
              height={24} 
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
