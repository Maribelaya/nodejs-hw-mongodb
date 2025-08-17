// import createHttpError from 'http-errors';
// import swaggerUI from 'swagger-ui-express';
// import fs from 'node:fs';
// import { SWAGGER_PATH } from '../constants/index.js';

// export const swaggerDocs = () => {
//   try {
//     const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH, 'utf8'));
//     return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
//   } catch (err) {
//     console.error('Swagger load error:', err);
//     return (req, res, next) =>
//       next(createHttpError(500, "Can't load swagger docs"));
//   }
// };
import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import YAML from 'yaml';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const file = fs.readFileSync(SWAGGER_PATH, 'utf8');
    const swaggerDoc = YAML.parse(file); // <-- замість JSON.parse
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.error('Swagger load error:', err);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
