import { useMetaMask } from '../hooks/useMetaMask';
import { useRequestSnap } from '../hooks/useRequestSnap';
import { shouldDisplayReconnectButton } from '../lib/button';

export const HeaderButtons = () => {
  const requestSnap = useRequestSnap();
  const { isFlask, installedSnap } = useMetaMask();

  if (!isFlask && !installedSnap) {
    return (
      <a href="https://metamask.io/flask/" target="_blank">
        Install MetaMask Flask
      </a>
    );
  }

  if (!installedSnap) {
    return (
      <button
        type="button"
        onClick={() => {
          // eslint-disable-next-line no-void
          void (async () => {
            // eslint-disable-next-line no-void
            void requestSnap();
          })();
        }}
      >
        Connect
      </button>
    );
  }

  if (shouldDisplayReconnectButton(installedSnap)) {
    return (
      <button
        type="button"
        onClick={() => {
          // eslint-disable-next-line no-void
          void (async () => {
            // eslint-disable-next-line no-void
            void requestSnap();
          })();
        }}
      >
        Reconnect
      </button>
    );
  }

  return <p>Connected</p>;
};
