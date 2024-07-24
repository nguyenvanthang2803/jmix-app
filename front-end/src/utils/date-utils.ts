import dayjs from 'dayjs';

export function getFormattedDateFromServer(date: string) {
  const formatDate = dayjs(date).format('YYYY-MM-DD');
  return formatDate;
}

export function getFormattedDatetoServer(date: Date) {
  date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
  return date.toISOString().replace('Z', '').split('.')[0];
}
