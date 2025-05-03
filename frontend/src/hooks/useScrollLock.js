import { useEffect } from 'react';

const useScrollLock = (lock) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    if (lock) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Add padding to prevent content shift when scrollbar disappears
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Lock scroll while preserving position
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    return () => {
      if (lock) {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.overflow = originalStyle;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [lock]);
};

export default useScrollLock; 