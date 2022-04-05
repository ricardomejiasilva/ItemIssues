// Takes a fetch response and returns a JSON object
const parseJsonResponse = async <T>(response: Response): Promise<T> => {
    return (await response.json()) as T;
};

export default parseJsonResponse;
