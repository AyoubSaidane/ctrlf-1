"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

// Example documents - replace with actual data
const documents = [
  {
    name: "Research Paper on AI Ethics",
    type: "PDF Document",
    link: "https://example.com/ai-ethics.pdf"
  },
  {
    name: "Machine Learning Guidelines",
    type: "Word Document",
    link: "https://example.com/ml-guidelines.docx"
  },
  {
    name: "Data Science Best Practices",
    type: "Web Article",
    link: "https://example.com/data-science"
  }
]

export function RelevantDocuments() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Relevant Documents</h2>
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <Link 
            href={doc.link} 
            key={index}
            target="_blank"
            className="block"
          >
            <div className={cn(
              "p-4 border rounded-lg hover:bg-accent transition-colors",
              "cursor-pointer"
            )}>
              <h3 className="font-semibold">{doc.name}</h3>
              <p className="text-sm text-muted-foreground">{doc.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
