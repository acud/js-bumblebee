import * as swarm from 'swarm-lowlevel'
import { ChunkClient } from '../bee/interface';
import { Address } from '../swarm/address';


export function join(addr: Address, client: ChunkClient, st: WritableStream) {

	const getter = {
		get: function (hash) {
			// this won't work since the
			// joiner does not support async operations
			let result = null;
			const main = async () => {
				const addr = new Address(hash)
				const res = await client.getChunk(addr);
				result = res.getData().buffer
			}
			main();
			while (result === null) {
				if (result !== null) {
					break
				}
			}
			return result
		}
	}

	const j = new swarm.fileJoiner(getter.get, st);
	j.join(addr);
}