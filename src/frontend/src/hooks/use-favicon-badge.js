import { useState, useCallback } from 'react';
import { useFavicon, useMountedState } from 'react-use';
import useVisible from './use-document-visible';

import Logo from '../images/logo.svg';
import BadgedLogo from '../images/logo-badge.svg';

const pickLogo = (badge) => (badge ? BadgedLogo : Logo);

const useFaviconBadge = (badge) => {
  const isMounted = useMountedState();
  const [state, setState] = useState(badge);
  const isVisible = useVisible();
  if (state && isVisible) {
    setState(false);
  }
  useFavicon(pickLogo(state));
  const setBadge = useCallback(
    (value) => {
      if (!isMounted()) {
        return;
      }
      setState(!isVisible && value);
    },
    [isVisible, isMounted]
  );

  return setBadge;
};

export default useFaviconBadge;