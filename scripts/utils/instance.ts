import fhevmjs from 'fhevmjs';

export const createInstance = async () => {
    const instance = await fhevmjs.createInstance({
        networkUrl: hre.network.config.url,
        gatewayUrl: 'https://gateway.rpc.encifher.io',
    });
    return instance;
};