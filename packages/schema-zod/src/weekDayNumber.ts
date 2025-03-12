import {
  icsWeekdayNumberToObject,
  type ParseWeekDayNumber,
} from "ts-ics";
import { zWeekdayNumberObject } from "./weekDay";

export const parseIcsWeekdayNumber: ParseWeekDayNumber = (...props) =>
  icsWeekdayNumberToObject(zWeekdayNumberObject, ...props);
