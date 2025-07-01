export type RequestOptions<T> = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: T;
    headers?: HeadersInit;
}

function buildRequest<T>(requestOptions: RequestOptions<T>): Request {
    const requestHeaders: HeadersInit = {
        "Content-Type": "application/json",
        ...requestOptions.headers,
    };

    return new Request(requestOptions.url, {
        method: requestOptions.method,
        headers: requestHeaders,
        body: requestOptions.body ? JSON.stringify(requestOptions.body) : undefined,
        credentials: "include",
        mode: "cors",
    });
}

export async function sendRequest<T, ReturnType>(requestOptions: RequestOptions<T>): Promise<ReturnType> {
    const urlWithBase = `/Quizzler/${requestOptions.url}`;
    const request = buildRequest<T>({ ...requestOptions, url: urlWithBase });
    return await fetch(request).then(async response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //Attempt json parse or fallback to text
        if (response.headers.get("Content-Type")?.includes("application/json")) {
            return response.json() as ReturnType;
        }
        return response.text() as ReturnType;
    }).catch(error => {
        console.error("Error sending request: ", error);
        throw error;
    });
}