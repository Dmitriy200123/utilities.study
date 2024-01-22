export class ApiTransport {
    private static Url = 'http://localhost:8080/';

    protected static get<T>(url: string, toObject: (json: any) => T): Promise<T> {
        return this.fetch<T>('GET', url, toObject);
    }

    protected static post<T>(url: string, body: {}, toObject: (json: any) => T): Promise<T> {
        return this.fetch<T>('POST', url, toObject, body);
    }

    protected static put<T>(url: string, body: {}, toObject: (json: any) => T): Promise<T> {
        return this.fetch<T>('PUT', url, toObject, body);
    }

    protected static delete(url: string, body: {} | null = null): Promise<void> {
        return this.fetch<void>('DELETE', url, () => {
        }, body);
    }

    private static fetch<T>(method: string, url: string, toObject: (json: any) => T, body: {} | null = null): Promise<T> {

        try {
            const request = body == null ? {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            } : {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            };

            return fetch(this.Url + url, request).then(response => response.ok ? response.json().then(json => {
                return toObject(json);
            }) : Promise.reject(response));
        } catch {
            return Promise.reject();
        }
    }
}