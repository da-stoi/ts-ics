import {
  icsTimezonePropToObject,
  icsTimezoneToObject,
  ParseTimezonePropOptions,
  timezonePropTypes,
  VTimezone,
  VTimezoneProp,
} from "ts-ics";
import { z } from "zod";
import { zRecurrenceRule } from "./recurrenceRule";
import { zDateObject } from "./date";

export const zVTimezoneProp: z.ZodType<VTimezoneProp> = z.object({
  type: z.enum(timezonePropTypes),
  start: z.date(),
  offsetTo: z.string(),
  offsetFrom: z.string(),
  recurrenceRule: zRecurrenceRule.optional(),
  comment: z.string().optional(),
  recurrenceDate: zDateObject.optional(),
  name: z.string().optional(),
});

export const parseIcsTimezoneProp = (
  rawTimezonePropString: string,
  timezonePropOptions?: ParseTimezonePropOptions
) =>
  icsTimezonePropToObject(
    rawTimezonePropString,
    zVTimezoneProp,
    timezonePropOptions
  );

export const zVTimezone: z.ZodType<VTimezone> = z.object({
  id: z.string(),
  lastModified: z.date().optional(),
  url: z.string().url().optional(),
  props: z.array(zVTimezoneProp),
});

export const parseIcsTimezone = (timezoneString: string): VTimezone =>
  icsTimezoneToObject(timezoneString, zVTimezone);
