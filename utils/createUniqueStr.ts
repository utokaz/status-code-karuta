export const createUniqueStr = () => {
  const strong = 100000;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};
