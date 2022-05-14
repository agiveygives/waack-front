type QueryResType =  {
  status: 'loading' | 'success' | 'error' | 'noop' | 'refresh',
  data?: Record<string | number | symbol, unknown> | unknown[] | null,
  error?: Error
}

export default QueryResType;
