import { WeekDayNumberLineToObject, type WeekDay } from "@/types/weekday";
import { standardValidate } from "./utils/standardValidate";
import { Line } from "@/types";

const __icsWeekdayNumberToObject = (value: Line["value"]) => {
  const isWeekdayOnly = value.length === 2;

  if (isWeekdayOnly) return { day: value as WeekDay };

  const occurence = value.slice(0, -2);
  const day = value.replace(occurence, "");

  return { day: day as WeekDay, occurence: Number(occurence) };
};

export const icsWeekdayNumberToObject: WeekDayNumberLineToObject = (
  line,
  schema
) => standardValidate(schema, __icsWeekdayNumberToObject(line.value));
