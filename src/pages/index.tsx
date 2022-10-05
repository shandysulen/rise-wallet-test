import { Button, Center, Image, FormHelperText, FormControl } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { getFormattedAddress } from '../utils';

const Index = () => {
  const [address, setAddress] = useState('');

  const connect = useCallback(async () => {
    await (window as any).rise.connect();
    setAddress((window as any).rise.account().address);
  }, []);

  const disconnect = useCallback(async () => {
    await (window as any).rise.disconnect();
    setAddress((window as any).rise.account().address);
  }, []);

  const formattedAddress = useMemo(() => address ? getFormattedAddress(address) : address, [address]);

  return (
    <Center height="100vh" flexDir='column' align='center'>
      <Button
        leftIcon={<Image src='/rise-wallet.png' boxSize='24px' />}
        onClick={address ? disconnect : connect}
      >
        {address ? 'Disconnect' : 'Connect'} Wallet
      </Button>
      {address && (
        <FormControl>
          <FormHelperText>Logged in as {formattedAddress}</FormHelperText>
        </FormControl>
      )}
    </Center>
  );
};

export default Index;
