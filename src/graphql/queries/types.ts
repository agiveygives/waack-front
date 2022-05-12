type QueryResType =  {
  status: 'loading' | 'success' | 'error',
  data?: Record<string | number | symbol, unknown> | unknown[] | null,
  error?: Error
}

export default QueryResType;
