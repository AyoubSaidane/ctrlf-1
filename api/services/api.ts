import { QueryRequest, QueryResponse, ProcessedQueryResponse, ParsedResponse } from '../types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submitQuery(request: QueryRequest): Promise<ProcessedQueryResponse> {
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }

  const response = await fetch(`${API_URL}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      message: request.query  // Changed this line to directly use the query string
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawResponse: QueryResponse = await response.json();
  console.log('Raw response:', rawResponse); // Will show the string version

  const parsedData: ParsedResponse = JSON.parse(rawResponse.response);
  console.log('Parsed data:', parsedData); // Will show the structured data

  return { parsedData };
}
