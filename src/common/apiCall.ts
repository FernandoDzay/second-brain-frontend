import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type ApiError = {
    message: string;
    statusCode: number;
};

export const client = (() => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            Accept: 'application/json, text/plain, */*',
        },
        withCredentials: true,
    });
})();

export const apiCall = async <T>(
    options: AxiosRequestConfig & { method: 'GET' | 'POST' | 'PATCH' | 'DELETE' },
): Promise<T> => {
    const onSuccess = (response: AxiosResponse) => {
        const { data } = response;
        return data as T;
    };

    const onError = function (error: AxiosError) {
        console.log(error);
        const apiError: ApiError = {
            message: 'Lo sentimos, ocurrió un error inesperado',
            statusCode: 500,
        };
        if (
            error.response?.data &&
            typeof error.response.data === 'object' &&
            'message' in error.response.data &&
            'statusCode' in error.response.data &&
            typeof error.response.data.message === 'string' &&
            typeof error.response.data.statusCode === 'number'
        ) {
            apiError.message = error.response.data.message;
            apiError.statusCode = error.response.data.statusCode;
        }

        return Promise.reject(apiError);
    };

    return client({
        paramsSerializer: {
            indexes: null,
        },
        ...options,
    })
        .then(onSuccess)
        .catch(onError);
};
