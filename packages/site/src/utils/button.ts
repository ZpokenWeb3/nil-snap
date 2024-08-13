import type { Snap } from '../types/snap';
import { isLocalSnap } from './snap';

export const shouldDisplayReconnectButton = (installedSnap: Snap | null) =>
  installedSnap && isLocalSnap(installedSnap?.id);
