export const queryStringToObject = (queryString: string): Record<string, string> | undefined => {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
        if (value !== '') {
            result[key] = value;
        }
    }

    return Object.keys(result).length > 0 ? result : undefined;
};

export const objectToQueryString = (
    object: Record<string, string | number | boolean | null | undefined>,
): string => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(object)) {
        if (value !== '' && value !== null && value !== undefined) {
            params.append(key, String(value));
        }
    }

    const query = params.toString();
    return query ? `?${query}` : '';
};
