import lodash from 'lodash';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export function useDebouncedSearchParams(delay = 500) {
  const [searchParam, setSearchParams] = useSearchParams();

  const debouncedUpdate = useMemo(() => {
    return lodash.debounce((paramNameOrObject, value) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (!paramNameOrObject) {
          return new URLSearchParams();
        }

        // Jika parameter pertama adalah object
        if (
          typeof paramNameOrObject === 'object' &&
          paramNameOrObject !== null
        ) {
          for (const [key, val] of Object.entries(paramNameOrObject)) {
            if (val === null || val === '' || val === undefined) {
              params.delete(key);
            } else {
              params.set(key, String(val));
            }
          }
        }
        // Jika parameter pertama adalah string (cara lama)
        else if (typeof paramNameOrObject === 'string') {
          if (value === null || value === '' || value === undefined) {
            params.delete(paramNameOrObject);
          } else {
            params.set(paramNameOrObject, String(value));
          }
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

  // Cara pakai: updateParam("search", "kopi") || updateParam({ search: "kopi", page: 1 })
  const updateParam = (paramName, value) => {
    debouncedUpdate(paramName, value);
  };

  // Method untuk clear semua params
  const clearAllParams = () => {
    updateParam();
  };

  return { searchParam, updateParam, clearAllParams };
}
