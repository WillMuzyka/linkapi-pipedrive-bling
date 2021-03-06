// eslint-disable-next-line import/prefer-default-export
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
};

export const formattedTodayDate = (): string => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};
