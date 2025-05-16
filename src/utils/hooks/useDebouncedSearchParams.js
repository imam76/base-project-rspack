import lodash from 'lodash';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export function useDebouncedSearchParams(delay = 500) {
  const [_, setSearchParams] = useSearchParams();

  const debouncedUpdate = useMemo(() => {
    return lodash.debounce((paramName, value) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (value === null || value === '') {
          params.delete(paramName);
        } else {
          params.set(paramName, value);
        }
        return params;
      });
    }, delay);
  }, [setSearchParams, delay]);

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  // Cara pakai: updateParam("search", "kopi")
  const updateParam = (paramName, value) => {
    debouncedUpdate(paramName, value);
  };

  return updateParam;
}
