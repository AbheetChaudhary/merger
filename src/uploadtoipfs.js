import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

const uploadJsonToIpfs = async (jsonObject) => {
  try {
    const added = await ipfs.add(JSON.stringify(jsonObject));
    return added.path;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw new Error('Failed to upload JSON to IPFS');
  }
};

export default uploadJsonToIpfs;

