import  {SwaggerRouter}  from 'koa2-swagger-ui';
import { readFileSync } from 'fs';
import { join } from 'path';

const swaggerSpec = JSON.parse(readFileSync(join(__dirname, 'swagger.json'), 'utf8'));

const swaggerRouter = new SwaggerRouter();
swaggerRouter.swagger({
  title: 'User Management API',
  description: 'API for managing users',
  version: '1.0.0',
  swaggerHtmlEndpoint: '/swagger-html',
  swaggerJsonEndpoint: '/swagger-json',
  swaggerJson: swaggerSpec,
});

export default swaggerRouter;