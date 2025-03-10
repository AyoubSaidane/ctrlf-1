export interface QueryRequest {
  query: string;
}

export interface Document {
  title: string;
  url: string;
  localPath?: string; // Made optional
  page: number;
  array_buffer?: string; // Base64-encoded PDF data
}

export interface ParsedResponse {
  text: string;
  experts: string[];
  documents: Document[];
}

export interface QueryResponse {
  response: string; // This is a JSON string that needs to be parsed
}

export interface ProcessedQueryResponse {
  parsedData: ParsedResponse;
}
