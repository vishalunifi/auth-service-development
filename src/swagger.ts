import { koaSwagger } from 'koa2-swagger-ui';
import { readFileSync } from 'fs';
import { join } from 'path';

const swaggerSpec = JSON.parse(readFileSync(join(__dirname, './swagger.json'), 'utf8'));

export const setupSwagger = (app: any) => {
  app.use(
    koaSwagger({
      routePrefix: '/swagger', // host at /swagger instead of default /docs
      swaggerOptions: {
        spec: swaggerSpec,
      },
    })
  );
};
