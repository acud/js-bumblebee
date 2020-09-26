import { HashBmt } from "./bmt";
import { Address } from '../swarm/address';

test('test hello world', () => {
    const data = new TextEncoder().encode("hello world");
    const expHash = new Address("92672a471f4419b255d7cb0cf313474a6f5856fb347c5ece85fb706d644b630f").bytes()
    const dd = HashBmt(data)
    expect(dd).toEqual(expHash);
});
