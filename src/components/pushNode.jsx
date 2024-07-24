import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { useContract } from '@thirdweb-dev/react';
import { useState, useEffect } from "react";
import { prepareContractCall } from "thirdweb";
import { CONTRACT } from '../utils/constants';

const CreateNode = () => {
  const [ipfsFilePathPart1, setIpfsFilePathPart1] = useState(""); // bytes32 part 1
  const [ipfsFilePathPart2, setIpfsFilePathPart2] = useState(""); // bytes32 part 2
  const [jobId, setJobId] = useState(0); // 32 bit number

  // Function to convert IPFS CID to hex
  const ipfsCidToHex = (cid) => {
    const buffer = Buffer.from(cid);
    let hex = buffer.toString('hex');
    if (hex.length > 128) {
      hex = hex.slice(0, 128);
    } else {
      hex = hex.padEnd(128, '0');
    }
    return hex;
  };

  // Function to split hex into two parts
  const splitHexToParts = (hex) => {
    const part1 = hex.slice(0, 64);
    const part2 = hex.slice(64, 128);
    return [part1, part2];
  };

  // Function to set the IPFS path parts from the CID
  const setIpfsPathFromCid = (cid) => {
    const hex = ipfsCidToHex(cid);
    const [part1, part2] = splitHexToParts(hex);
    setIpfsFilePathPart1(part1);
    setIpfsFilePathPart2(part2);
  };

  // Function to fetch job ID from backend
  const fetchJobId = async () => {
    // Replace this with actual function to get job ID from your backend
    const jobIdFromBackend = await getJobIdFromBackend();
    setJobId(jobIdFromBackend);
  };

  useEffect(() => {
    // Example CID, replace with actual function to get CID from your backend
    const cidFromBackend = "QmXf1YQbYvRovKkQgmJdVuS3oRjSy1zQp1Qm1Q4T1B6MZ3";
    setIpfsPathFromCid(cidFromBackend);
    fetchJobId();
  }, []);

  const handleTransactionSent = () => {
    console.log('Transaction sent...');
  };

  const handleTransactionConfirmed = () => {
    console.log('Transaction confirmed');
    // refetch(); // Refetch the contract data after a successful transaction
  };

  const prepareTransaction = () => {
    // Log the current values of IPFS file path and Job ID
    console.log("IPFS File Path Part 1: ", ipfsFilePathPart1);
    console.log("IPFS File Path Part 2: ", ipfsFilePathPart2);
    console.log("Job ID: ", jobId);

    // Ensure that the IPFS file path parts are valid bytes32 values
    const part1 = `0x${ipfsFilePathPart1.padStart(64, '0')}`;
    const part2 = `0x${ipfsFilePathPart2.padStart(64, '0')}`;
    console.log("Prepared IPFS File Path Parts: ", part1, part2);

    return prepareContractCall({
      contract: CONTRACT,
      method: "addWorkNode",
      params: [[part1, part2], jobId],
    });
  };

  return (
    <div style={{ marginTop: "20px", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <TransactionButton
        transaction={prepareTransaction}
        onTransactionSent={handleTransactionSent}
        onTransactionConfirmed={handleTransactionConfirmed}
        onError={(error) => {
          console.error("Transaction error", error);
        }}
        style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "4px", backgroundColor: "#007bff", color: "#fff", border: "none" }}
      >
        Add to WorkChain
      </TransactionButton>
    </div>
  );
};

export default CreateNode;

