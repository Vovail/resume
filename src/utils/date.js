export const formatDateForPeriod = (dateString) => {
  if (dateString === 'Present') return dateString;
  const ms = Date.parse(dateString);
  if (Number.isNaN(ms)) {
    return dateString;
  }
  const date = new Date(ms);
  const month = date.toLocaleString('default', { month: 'long' });
  return `${month} ${date.getFullYear()}`;
};
