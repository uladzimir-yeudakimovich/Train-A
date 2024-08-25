export const getTomorrow = () => {
  const today = new Date(Date.now());
  return new Date(today.setDate(today.getDate() + 1));
};
