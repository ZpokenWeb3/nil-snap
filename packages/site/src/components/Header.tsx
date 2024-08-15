import { Link } from 'gatsby';
import { Settings } from 'lucide-react';
import React from 'react';

import { ReactComponent as Logo } from '../assets/logo.svg';
import { ConnectButton } from './ConnectButton';
import { Button } from './ui/button';

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/" className="w-[99] h-9">
        <Logo />
      </Link>
      <div className="flex gap-6 items-center">
        <div className="p-[3px] rounded-[10px] bg-icon-background hover:cursor-pointer">
          <Settings className="size-6 text-icon-secondary" />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};
