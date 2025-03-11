import { COMMA } from "@/constants";

import { icsWeekdayNumberToObject } from "@/lib/parse/weekdayNumber";

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `MO,TU,WE,TH,FR,SA,SU`;

  expect(() =>
    weekdayNumber
      .split(COMMA)
      .forEach((w) => icsWeekdayNumberToObject(undefined, { value: w }))
  ).not.toThrow();
});

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `1SU`;

  expect(() =>
    icsWeekdayNumberToObject(undefined, { value: weekdayNumber })
  ).not.toThrow();
});

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `-1MO`;

  expect(() =>
    icsWeekdayNumberToObject(undefined, { value: weekdayNumber })
  ).not.toThrow();
});
