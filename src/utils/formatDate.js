import { format, parseISO } from "date-fns";
import moment from 'moment';

export function formatDate(date) {
  date = parseISO(date);
  return format(date, "dd/MM/yyyy HH:mm");
};
export function InputformatDate(date) {
  return moment(date).format("YYYY-MM-DDTkk:mm");
};