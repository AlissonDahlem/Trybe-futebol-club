import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('Caiu no middleware');
  const { name, message } = err;
  switch (name) {
    case 'missingFields':
      res.status(400).json({ message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message });
      break;
    case 'notFound':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};

export default errorMiddleware;
