"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Document } from "@/api/types/api";

interface RelevantDocumentsProps {
  documents?: Document[];
}

export function RelevantDocuments({ documents = [] }: RelevantDocumentsProps) {
  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Relevant Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <a
            key={index}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-gray-200 hover:border-sky-500 transition-colors cursor-pointer"
          >
            <h3 className="font-medium text-lg truncate">{doc.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
