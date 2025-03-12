import { COMMA, SEMICOLON } from "@/constants";
import {
  RRULE_TO_OBJECT_KEYS,
  type RRuleKey,
  type RRuleObjectKey,
} from "@/constants/keys/recurrenceRule";
import {
  type RecurrenceRule,
  recurrenceRuleFrequencies,
  type RecurrenceRuleFrequency,
  type RecurrenceRuleLineToObject,
} from "@/types";

import { icsTimeStampToObject } from "./timeStamp";
import { getOptions } from "./utils/options";
import { icsWeekdayNumberToObject } from "./weekdayNumber";
import { icsWeekDayStringToWeekDay } from "./weekDay";
import { standardValidate } from "./utils/standardValidate";

const recurrenceTimestampKeys = ["until"] satisfies RRuleObjectKey[];

type RecurrenceTimeStampKey = (typeof recurrenceTimestampKeys)[number];

export const recurrenceObjectKeyIsTimeStamp = (
  objectKey: RRuleObjectKey
): objectKey is RecurrenceTimeStampKey =>
  recurrenceTimestampKeys.includes(objectKey as RecurrenceTimeStampKey);

const recurrenceNumberArrayKeys = [
  "bySecond",
  "byMinute",
  "byHour",
  "byMonthday",
  "byYearday",
  "byWeekNo",
  "bySetPos",
] satisfies RRuleObjectKey[];

type RecurrenceNumberArrayKey = (typeof recurrenceNumberArrayKeys)[number];

export const recurrenceObjectKeyIsNumberArray = (
  objectKey: RRuleObjectKey
): objectKey is RecurrenceNumberArrayKey =>
  recurrenceNumberArrayKeys.includes(objectKey as RecurrenceNumberArrayKey);

const recurrenceWeekdayNumberArrayKeys = ["byDay"] satisfies RRuleObjectKey[];

type RecurrenceWeekDayNumberArrayKey =
  (typeof recurrenceWeekdayNumberArrayKeys)[number];

export const recurrenceObjectKeyIsWeekdayNumberArray = (
  objectKey: RRuleObjectKey
): objectKey is RecurrenceWeekDayNumberArrayKey =>
  recurrenceWeekdayNumberArrayKeys.includes(
    objectKey as RecurrenceWeekDayNumberArrayKey
  );

const recurrenceNumberKeys = ["count", "interval"] satisfies RRuleObjectKey[];

type RecurrenceNumberKey = (typeof recurrenceNumberKeys)[number];

export const recurrenceObjectKeyIsNumber = (
  objectKey: RRuleObjectKey
): objectKey is RecurrenceNumberKey =>
  recurrenceNumberKeys.includes(objectKey as RecurrenceNumberKey);

export const icsRecurrenceRuleToObject: RecurrenceRuleLineToObject = (
  schema,
  line,
  recurrenceRuleOptions
) => {
  const rule: Partial<RecurrenceRule> = {};

  const options = getOptions<RRuleKey>(line.value.split(SEMICOLON));

  options.forEach((r) => {
    const { property, value } = r;

    const objectKey = RRULE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (recurrenceObjectKeyIsTimeStamp(objectKey)) {
      rule[objectKey] = icsTimeStampToObject(
        undefined,
        {
          value,
          options: { VALUE: value.includes("T") ? "DATE-TIME" : "DATE" },
        },
        { timezones: recurrenceRuleOptions?.timezones }
      );

      return;
    }

    if (recurrenceObjectKeyIsNumberArray(objectKey)) {
      rule[objectKey] = value.split(COMMA).map((v) => Number(v));

      return;
    }

    if (objectKey === "byMonth") {
      rule[objectKey] = value.split(COMMA).map((v) => Number(v) - 1); // ICS byMonth fängt bei 1 an, Javascript bei 0
      return;
    }

    if (recurrenceObjectKeyIsWeekdayNumberArray(objectKey)) {
      rule[objectKey] = value
        .split(COMMA)
        .map((v) => icsWeekdayNumberToObject(undefined, { value: v }));
      return;
    }

    if (recurrenceObjectKeyIsNumber(objectKey)) {
      rule[objectKey] = Number(value);
      return;
    }

    if (objectKey === "frequency") {
      if (
        !value ||
        !recurrenceRuleFrequencies.includes(value as RecurrenceRuleFrequency)
      )
        return;

      rule[objectKey] = value as RecurrenceRuleFrequency;
      return;
    }

    if (objectKey === "workweekStart") {
      rule[objectKey] = icsWeekDayStringToWeekDay(undefined, { value });
      return;
    }
  });

  return standardValidate(schema, rule as RecurrenceRule);
};
