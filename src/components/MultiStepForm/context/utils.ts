export const getParamsFromHash = (hash: string) => {
  const [, hashWithoutPathname] = hash.split('#');
  if (hashWithoutPathname === undefined) return {};

  const paramsInUrl = hashWithoutPathname.split('&');
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split('=');
    return { ...accumulator, [key]: value };
  }, {} as Record<string, string>);

  return paramsSplitUp;
};
