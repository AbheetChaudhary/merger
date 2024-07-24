// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useActiveAccount } from "thirdweb/react";
import { ethers } from 'ethers';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';

// Define the ABI of your WorkRegistry contract
const workRegistryAbi = [
  "function getWorkNodes() view returns (tuple(bytes32[2], uint32)[])"
];

const WorkRegistryAddress = "0x41ee423473a1c4d8dac2277fe34f9eeb6eaea6f7"; // Replace with your contract address

const WorkRegistryComponent = () => {
  const account = useActiveAccount();
  const address = account?.address || "";
  const { contract } = useContract(WorkRegistryAddress, workRegistryAbi);
  console.log(12);
  const [workNodes, setWorkNodes] = useState([]);

  // Fetch work nodes from the smart contract
  const fetchWorkNodes = async () => {
    if (contract && address) {
      try {
        const nodes = await contract.call("getWorkNodes");
        setWorkNodes(nodes);
      } catch (error) {
        console.error("Error fetching work nodes:", error);
      }
    }
  };

  useEffect(() => {
    fetchWorkNodes();
  }, [contract, address]);

  return (
    <div>
      <h1>Work Nodes</h1>
      <button onClick={fetchWorkNodes}>Fetch Work Nodes</button>
      {workNodes.length > 0 ? (
        <ul>
          {workNodes.map((node, index) => (
            <li key={index}>
              <p>IPFS File Path: {node[0].toString()}</p>
              <p>Job ID: {node[1]}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No work nodes available.</p>
      )}
    </div>
  );
};

export default WorkRegistryComponent;

