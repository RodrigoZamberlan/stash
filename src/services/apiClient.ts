const BASE_API_URL = "http://localhost/8080";

export const apiClient = async<T>(
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

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
    }

    return response.json();
}