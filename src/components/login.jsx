import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { ThirdwebProvider } from "thirdweb/react";
// import Counter from './counter';
import CreateNode from './pushNode';
import { client, chain } from '../utils/constants';

const Login = () => {
  const activeAccount = useActiveAccount();
  return (
        <ThirdwebProvider>
    <div style={{
      display: "flex",
      flexdirection: "column",
      alignItems: "center",
      justifyContent: 'center',
      height: "100vh",
    }}>
    {activeAccount ? (
      <div>
        <ConnectButton
        client={client}
        chain={chain}
        />
          <CreateNode />
      </div>
    ) : (
      <div>
        <ConnectButton
          client={client}
          chain={chain}
        />
      </div>
    )}
    </div>
        </ThirdwebProvider>
  )
}

export default Login;
