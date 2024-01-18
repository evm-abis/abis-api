import * as helmet from '@fastify/helmet';
import * as rateLimit from '@fastify/rate-limit';
import Fastify, { type FastifyInstance } from 'fastify';

import { abi } from './abi/abi.route';
import { chain } from './chain/chains.route';
import { monitoring } from './monitoring/monitoring.route';

/**
 * Start application
 */
async function start(): Promise<number> {
  const port: number = Number(process.env.PORT ?? 8080);
  const fastify: FastifyInstance = Fastify();

  // Middleware
  await fastify.register(helmet);
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Routes
  await fastify.register(monitoring, { prefix: '/monitoring' });
  await fastify.register(abi);
  await fastify.register(chain);

  try {
    await fastify.listen({ port, host: '0.0.0.0' });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  return port;
}

start()
  .then((port: number) => console.log(`Server is running on port ${port}`))
  .catch((error: Error) => console.error(error));
