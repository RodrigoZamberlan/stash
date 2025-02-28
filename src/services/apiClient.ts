const BASE_API_URL = "http://localhost:5085/api";

export const apiClient = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const { headers, ...restOptions } = options;
  
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  
    const contentType = response.headers.get("Content-Type") || "";
  
    if (!response.ok) {
      const errorBody = await (contentType.includes("application/json")
        ? response.json()
        : response.text());
  
      const errorMessage =
        typeof errorBody === "string"
          ? errorBody
          : errorBody.message || "Something went wrong";
  
      throw new Error(errorMessage);
    }
  
    if (!contentType.includes("application/json")) {
      if (response.status === 204) {
        return undefined as unknown as T;
      }
      throw new Error("Unexpected content type");
    }
  
    return response.json();
  };
  
  