import dayjs, { Dayjs } from 'dayjs';

export const formatDate = (date: Dayjs, format?: string) => {
  const formatDefaultString = 'ddd MMM D YYYY';
  return dayjs(date).format(format ?? formatDefaultString);
};
