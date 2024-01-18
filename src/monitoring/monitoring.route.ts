import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

/**
 * Monitoring routes
 */
export function monitoring(fastify: FastifyInstance, _: FastifyPluginOptions, done: (err?: Error) => void): void {
  fastify.get('/heartbeat', async () => ({ status: 'ok' }));

  done();
}
