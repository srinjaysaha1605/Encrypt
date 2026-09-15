import React from 'react';
import { ConversationalTerminal } from './ConversationalTerminal';

export interface MainWorkspaceProps {
  onReturnToLanding: () => void;
}

export const MainWorkspace: React.FC<MainWorkspaceProps> = ({ onReturnToLanding }) => {
  return <ConversationalTerminal onReturnToLanding={onReturnToLanding} />;
};
