export const filterUndefined = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
};
