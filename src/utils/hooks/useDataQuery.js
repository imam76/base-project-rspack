import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import Api from '../axios/api';

/**
 * Builds a URL with query parameters
 * @param {string} baseUrl - Base URL
 * @param {Object} params - Query parameters object
 * @returns {string} URL with query parameters
 */
function buildUrl(baseUrl, params) {
  const queryParts = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    // Custom format: key with brackets and CSV (e.g. includes[emails,phones]=true)
    const isBracketCsvKey =
      key.includes('[') && key.includes(',') && key.includes(']');

    if (isBracketCsvKey) {
      // Jangan encode key-nya
      queryParts.push(`${key}=${encodeURIComponent(value)}`);
    } else if (key === 'includes' && Array.isArray(value)) {
      // Khusus: includes[emails,phones,...]=true
      const joined = value.join(',');
      queryParts.push(`includes[${joined}]=true`);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Nested object: search[name]=abc
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        if (nestedValue !== undefined && nestedValue !== null) {
          queryParts.push(
            `${encodeURIComponent(key)}[${encodeURIComponent(nestedKey)}]=${encodeURIComponent(nestedValue)}`,
          );
        }
      }
    } else {
      // Normal key=value
      queryParts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );
    }
  }

  const queryString = queryParts.join('&');
  return `${baseUrl}?${queryString}`;
}

/**
 * Custom hook for handling form data loading and submission with React Query
 * @param {Object} config - Configuration object
 * @param {string[]} config.queryKey - Unique key for caching
 * @param {string} [config.getUrl] - Endpoint for fetching data (GET)
 * @param {Object} [config.filters={}] - Filter parameters for GET request
 * @param {string} config.submitUrl - Endpoint for submitting data
 * @param {string} [config.method='POST'] - HTTP method for submission
 * @param {boolean} [config.enabled=true] - Whether to enable the initial data fetching
 * @param {Function} [config.onSuccess] - Callback when submission succeeds
 * @param {Function} [config.onError] - Callback when submission fails
 * @param {Function} [config.transformResponse] - Function to transform API response
 * @param {Object} [config.queryOptions={}] - Additional options for useQuery
 * @param {Object} [config.mutationOptions={}] - Additional options for useMutation
 * @param {Object} [config.axiosConfig={}] - Additional Api configuration
 * @returns {Object} Form query result object
 */
export function useDataQuery({
  queryKey,
  getUrl,
  filters = {},
  submitUrl,
  method = 'POST',
  enabled = true,
  onSuccess,
  onError,
  transformResponse = (data) => data,
  queryOptions = {},
  mutationOptions = {},
  axiosConfig = {},
}) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [queryParams, setQueryParams] = useState(filters);

  // Build the complete URL with filters
  const fullGetUrl = getUrl ? buildUrl(getUrl, queryParams) : null;

  // If filters change, update the queryKey to trigger refetch
  const effectiveQueryKey = [...queryKey];
  if (Object.keys(queryParams).length > 0) {
    effectiveQueryKey.push({ filters: queryParams });
  }

  // Load data if getUrl is provided
  const {
    data: initialData,
    isLoading,
    error: fetchError,
    refetch,
    isError: isFetchError,
  } = useQuery({
    queryKey: effectiveQueryKey,
    queryFn: async () => {
      try {
        const res = await Api().get(fullGetUrl, {
          ...axiosConfig,
          paramsSerializer: {
            // Handle complex parameter serialization (like arrays and nested objects)
            encode: (param) => {
              // We already handled this in buildUrl
              return param;
            },
          },
        });
        return transformResponse(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    enabled: Boolean(fullGetUrl && enabled),
    ...queryOptions,
  });

  // Form submission mutation
  const mutation = useMutation({
    mutationFn: async (formData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const res = await Api().request({
          url: submitUrl,
          method,
          data: formData,
          ...axiosConfig,
        });
        return transformResponse(res.data);
      } catch (error) {
        setSubmitError(error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: (data) => {
      // Refresh data if needed
      queryClient.invalidateQueries({ queryKey: effectiveQueryKey });

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (err) => {
      if (onError) {
        onError(err);
      }
    },
    ...mutationOptions,
  });

  // Enhanced submit function with better error handling
  const submit = useCallback(
    (formData) => {
      return mutation.mutate(formData);
    },
    [mutation],
  );

  // Update filters for data fetching
  const setFilters = useCallback((newFilters) => {
    setQueryParams((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // Clear any submission errors
  const clearErrors = useCallback(() => {
    setSubmitError(null);
  }, []);

  // Reset the form state
  const reset = useCallback(() => {
    clearErrors();
    // If getUrl exists, refetch the initial data
    if (fullGetUrl) {
      refetch();
    }
  }, [clearErrors, fullGetUrl, refetch]);

  // Reset filters
  const clearFilters = useCallback(() => {
    setQueryParams({});
  }, []);

  return {
    // Data states
    initialData,
    isLoading,

    // Filter handling
    filters: queryParams,
    setFilters,
    clearFilters,

    // Error handling
    fetchError,
    submitError,
    error: submitError || fetchError,
    isFetchError,
    hasError: Boolean(submitError || fetchError),
    clearErrors,

    // Submission states
    isSubmitting,
    isSuccess: mutation.isSuccess,

    // Actions
    submit,
    refetch,
    reset,

    // Raw values for advanced usage
    mutation,
    fullUrl: fullGetUrl,
    queryResult: {
      data: initialData,
      isLoading,
      error: fetchError,
      refetch,
    },
  };
}
