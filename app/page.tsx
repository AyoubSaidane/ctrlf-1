"use client";

import { AIInputWithSearch } from "@/components/ui/ai-input-with-search";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function Home() {
    const textareaId = useId();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto space-y-8">
                <div>
                    <AIInputWithSearch 
                        onSubmit={(value, withSearch) => {
                            console.log('Message:', value);
                            console.log('Search enabled:', withSearch);
                        }}
                        onFileSelect={(file) => {
                            console.log('Selected file:', file);
                        }}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={textareaId}>Answer</Label>
                    <Textarea
                        id={textareaId}
                        className="read-only:bg-muted w-full"
                        defaultValue="This is a read-only textarea"
                        readOnly
                        placeholder="Leave a comment"
                    />
                </div>
            </div>
        </div>
    );
}
