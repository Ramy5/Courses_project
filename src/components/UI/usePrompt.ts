import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useBlocker = (blocker, when = true) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const handleBlock = (event) => {
      event.preventDefault();
      blocker();
    };

    window.addEventListener('beforeunload', handleBlock);

    return () => {
      window.removeEventListener('beforeunload', handleBlock);
    };
  }, [navigate, location, blocker, when]);
};

const usePrompt = (message, when = true) => {
  const blocker = useCallback(() => {
    if (window.confirm(message)) {
      // Continue navigation
    }
  }, [message]);

  useBlocker(blocker, when);
};

export { usePrompt };


