export function errorHandler(err, request, response, next) {
    if (typeof (err) === 'string') {
        return response.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        return response.status(401).json({ message: 'Invalid Token'});
    }

    return response.status(500).json({ message: err.message });
}