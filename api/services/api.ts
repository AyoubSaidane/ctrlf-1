import { QueryRequest, QueryResponse, ProcessedQueryResponse, ParsedResponse } from '../types/api';

export async function submitQuery(request: QueryRequest): Promise<ProcessedQueryResponse> {
  const response = await fetch(`/api/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: request.query
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawResponse: QueryResponse = await response.json();
  console.log('Raw response:', rawResponse);

  // Check if response is a string that needs to be parsed
  let parsedData: ParsedResponse;
  if (typeof rawResponse.response === 'string') {
    try {
      parsedData = JSON.parse(rawResponse.response);
    } catch (error) {
      // If parsing fails, use the response as is
      parsedData = rawResponse.response as unknown as ParsedResponse;
    }
  } else {
    // If it's already an object, use it directly
    parsedData = rawResponse.response as ParsedResponse;
  }
  
  console.log('Parsed data:', parsedData);

  return { parsedData };
}
