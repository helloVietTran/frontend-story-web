
const createQueryFn = (apiFn) => {
    return ({ queryKey }) => {
      const [, ...params] = queryKey;
      return apiFn(...params);
    };
};

export default createQueryFn;