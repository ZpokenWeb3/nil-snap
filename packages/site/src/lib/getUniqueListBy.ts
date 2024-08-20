export const getUniqueListBy = <T>(data: T[], key: keyof T) => {
  const set = new Set();

  return data.reduce((arr: T[], e: T) => {
    if (!set.has(e[key])) {
      set.add(e[key]);
      arr.push({ ...e });
    }
    return arr;
  }, []);
};
