export const getSearchParams = <T extends { [key: string]: any }>(params: T): string => {
  const url = new URLSearchParams();

  Object.entries(params).map(([key, value]) => {
    if (!value) {
      return;
    }
    url.append(key, value as string);
  });

  return url.toString();
};
