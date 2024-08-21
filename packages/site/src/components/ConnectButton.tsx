import { useMetaMask } from '../hooks/useMetaMask';
import { useRequestSnap } from '../hooks/useRequestSnap';
import { shouldDisplayReconnectButton } from '../lib/button';
import { useStore } from '../state';
import { walletSelector } from '../state/wallet';
import { Button } from './ui/button';

export const ConnectButton = () => {
  const requestSnap = useRequestSnap();
  const { isFlask, installedSnap } = useMetaMask();
  const { getAccount } = useStore(walletSelector);

  if (!isFlask && !installedSnap) {
    return (
      <a href="https://metamask.io/flask/" target="_blank">
        Install MetaMask Flask
      </a>
    );
  }

  if (!installedSnap) {
    return (
      <Button
        type="button"
        onClick={() => {
          void (async () => {
            await requestSnap();
            await getAccount();
          })();
        }}
        className="w-[146px]"
      >
        Connect
      </Button>
    );
  }

  if (shouldDisplayReconnectButton(installedSnap)) {
    return (
      <Button
        type="button"
        onClick={() => {
          void requestSnap();
        }}
        className="w-[146px]"
      >
        Reconnect
      </Button>
    );
  }

  return <p>Connected</p>;
};
