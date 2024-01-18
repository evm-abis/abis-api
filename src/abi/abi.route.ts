import type { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import type { ChainId } from '../chain/chain.enum';
import { assertChainIdValid } from '../chain/chain.utils';
import { getAbiPackage } from './services/abiPackager.service';

/**
 * Abi routes
 */
export function abi(fastify: FastifyInstance, _: FastifyPluginOptions, done: (err?: Error) => void): void {
  fastify.get('/:chainId(^\\d+)/:contractAddress(^0x[a-fA-F0-9]{40}$)', async (request, reply) => {
    const { chainId, contractAddress } = getParamsFromRequest(request);

    try {
      const { url } = await getAbiPackage(chainId, contractAddress);
      await reply.redirect(url);
    } catch (err) {
      await reply.status(404).send(err);
    }
  });

  fastify.post('/:chainId(^\\d+)/:contractAddress(^0x[a-fA-F0-9]{40}$)', async (request, reply) => {
    const { chainId, contractAddress } = getParamsFromRequest(request);

    try {
      const packageInfo = await getAbiPackage(chainId, contractAddress);
      await reply.send(packageInfo);
    } catch (err) {
      await reply.status(404).send(err);
    }
  });

  done();
}

/**
 * Get the params from the request
 */
function getParamsFromRequest(request: FastifyRequest): {
  chainId: ChainId;
  contractAddress: string;
} {
  const chainId: ChainId = (request.params as { chainId: string }).chainId as ChainId;
  const contractAddress: string = (request.params as { contractAddress: string }).contractAddress.toLowerCase();

  assertChainIdValid(chainId);

  return {
    chainId,
    contractAddress,
  };
}
