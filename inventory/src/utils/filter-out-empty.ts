export const filterOutEmpty = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined || null)) as Partial<T>;
};
