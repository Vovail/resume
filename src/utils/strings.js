export const capitalize = (string) => {
  if (typeof string !== 'string' || !string.length) return string;  
  return string[0].toUpperCase() + string.slice(1);
};
