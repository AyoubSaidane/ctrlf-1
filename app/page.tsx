"use client";

import { AIInputWithSearch } from "@/components/ui/ai-input-with-search";

export default function Home() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
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
        </div>
    );
}
