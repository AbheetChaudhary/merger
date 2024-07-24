import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = '4c6ae10a37650f22d07593502301ef5e';

export const client = createThirdwebClient({
  clientId: clientId,
});
