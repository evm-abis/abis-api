import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ChainId } from './chain.enum';

/**
 * Chain routes
 */
export function chain(fastify: FastifyInstance, _: FastifyPluginOptions, done: (err?: Error) => void): void {
  const chainList: Array<{ key: string; value: string }> = Object.entries(ChainId).map(([key, value]) => ({
    key,
    value,
  }));

  fastify.get('/chains', async (_, reply) => {
    await reply
      .headers({
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      })
      .send(chainList);
  });
  done();
}
