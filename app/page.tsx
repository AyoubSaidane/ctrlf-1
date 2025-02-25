"use client";

import { AIInputWithSearch } from "@/components/ui/ai-input-with-search";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId, useState } from "react";
import { AppCarousel } from "@/components/app-carousel";
import { ExpertsCarousel } from "@/components/experts-carousel";
import { RelevantDocuments } from "@/components/relevant-documents";
import { submitQuery } from "@/api/services/api";
import { ParsedResponse, Document} from "@/api/types/api";

export default function Home() {
    const textareaId = useId();
    const [answer, setAnswer] = useState("");
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (value: string, withSearch: boolean) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await submitQuery({ query: value });
            setAnswer(response.parsedData.text);
            setDocuments(response.parsedData.documents);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto space-y-8">
                <div>
                    <AIInputWithSearch 
                        onSubmit={handleSubmit}
                        onFileSelect={(file) => {
                            console.log('Selected file:', file);
                        }}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={textareaId} className="text-xl font-bold">
                        {isLoading ? "Thinking..." : "Answer"}
                    </Label>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <Textarea
                        id={textareaId}
                        className="read-only:bg-muted w-full"
                        value={answer}
                        readOnly
                        placeholder={isLoading ? "Generating answer..." : "Your answer will appear here"}
                    />
                </div>
                <AppCarousel />
                <ExpertsCarousel />
                <RelevantDocuments documents={documents} />
            </div>
        </div>
    );
}
