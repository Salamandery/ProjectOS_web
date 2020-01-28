import moment from 'moment-timezone';

export function formatDate(date) {
  date = moment.tz(date, 'America/Sao_Paulo').format("DD/MM/YYYY HH:mm");
  return date;
};
export function InputformatDate(date) {
  return moment(date).format("YYYY-MM-DDTkk:mm");
};