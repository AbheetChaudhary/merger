import { useReadContract, TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { CONTRACT } from '../utils/constants';

const Counter: React.FC = () => {

  const { data: count, isLoading: loadingCount, refetch } = useReadContract({
    contract: CONTRACT,
    method: "getCount",
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <h1>Counter</h1>
      {loadingCount ? (
        <h1>...</h1>
      ) : (
        <h2>{count?.toString()}</h2>
      )}
      <div>
        <TransactionButton 
          transaction={() => prepareContractCall({
            contract: CONTRACT,
            method: "decrement",
          })}
          onTransactionSent={() => console.log('decrementing...')}
          onTransactionConfirmed={() => refetch()}
          >-</TransactionButton>
        <TransactionButton
          transaction={() => prepareContractCall({
            contract: CONTRACT,
            method: "increment",
          })}
          onTransactionSent={() => console.log('incrementing...')}
          onTransactionConfirmed={() => refetch()}
          >+</TransactionButton>
      </div>
    </div>
  );
}

export default Counter;
