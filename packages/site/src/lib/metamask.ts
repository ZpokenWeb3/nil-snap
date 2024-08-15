import type {
  EIP6963AnnounceProviderEvent,
  MetaMaskInpageProvider,
} from '@metamask/providers';

export async function hasSnapsSupport(
  provider: MetaMaskInpageProvider = window.ethereum,
) {
  try {
    await provider.request({
      method: 'wallet_getSnaps',
    });

    return true;
  } catch {
    return false;
  }
}

export async function getMetaMaskEIP6963Provider() {
  return new Promise<MetaMaskInpageProvider | null>((rawResolve) => {
    // Timeout looking for providers after 500ms
    const timeout = setTimeout(() => {
      resolve(null);
    }, 500);

    function resolve(provider: MetaMaskInpageProvider | null) {
      window.removeEventListener(
        'eip6963:announceProvider',
        onAnnounceProvider,
      );
      clearTimeout(timeout);
      rawResolve(provider);
    }

    function onAnnounceProvider({ detail }: EIP6963AnnounceProviderEvent) {
      if (!detail) {
        return;
      }

      const { info, provider } = detail;

      if (info.rdns.includes('io.metamask')) {
        resolve(provider);
      }
    }

    window.addEventListener('eip6963:announceProvider', onAnnounceProvider);

    window.dispatchEvent(new Event('eip6963:requestProvider'));
  });
}

export async function getSnapsProvider() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (await hasSnapsSupport()) {
    return window.ethereum;
  }

  if (window.ethereum?.detected) {
    for (const provider of window.ethereum.detected) {
      if (await hasSnapsSupport(provider)) {
        return provider;
      }
    }
  }

  if (window.ethereum?.providers) {
    for (const provider of window.ethereum.providers) {
      if (await hasSnapsSupport(provider)) {
        return provider;
      }
    }
  }

  const eip6963Provider = await getMetaMaskEIP6963Provider();

  if (eip6963Provider && (await hasSnapsSupport(eip6963Provider))) {
    return eip6963Provider;
  }

  return null;
}
