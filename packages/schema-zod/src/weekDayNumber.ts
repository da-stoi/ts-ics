import {
  icsWeekdayNumberToObject,
  ParseWeekDayNumber,
  WeekdayNumberObject,
} from "ts-ics";
import { zWeekdayNumberObject } from "./weekDay";

export const parseIcsWeekdayNumber: ParseWeekDayNumber = (line) =>
  icsWeekdayNumberToObject(line, zWeekdayNumberObject);
