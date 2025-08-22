import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalKeyListener = (): null => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F7') {
        event.preventDefault();
        // Navigate to the admin login page
        navigate('/login');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return null;
};

export default GlobalKeyListener;
