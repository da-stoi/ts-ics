import { readFileSync } from "node:fs";

import { getTimezoneRegex } from "@/constants";
import { icsTimezoneToObject } from "@/lib";
import { icsTimeStampToObject } from "@/lib/parse/timeStamp";
import { getLine } from "@/lib/parse/utils/line";

it("Test Ics Timestamp Parse - Date", async () => {
  const year = 2023;
  const month = 4;
  const javascriptMonth = month - 1; // Months in Javascript are 0-based
  const day = 1;

  const timestamp = `DTSTART;VALUE=DATE:${year}${month
    .toString()
    .padStart(2, "0")}${day.toString().padStart(2, "0")}`;

  const { line } = getLine(timestamp);

  const timeStamp = icsTimeStampToObject(line, undefined, {});

  expect(timeStamp.date).toStrictEqual(
    new Date(Date.UTC(year, javascriptMonth, day))
  );
});

it("Test Ics Timestamp Parse - Datetime", async () => {
  const timestamp = "DTSTART:20230118T073000Z";

  const { line } = getLine(timestamp);

  expect(() => icsTimeStampToObject(line, undefined, {})).not.toThrow();
});

it("Test Ics Timestamp Parse - UTC", async () => {
  const timestamp = "DTSTART:20230118T090000Z";

  const { line } = getLine(timestamp);

  const parsed = icsTimeStampToObject(line, undefined, {});

  expect(parsed.date.getUTCHours()).toEqual(9);

  expect(parsed.local).toBeUndefined();

  expect(() => parsed).not.toThrow();
});

it("Test Ics Timestamp Parse - VTimezones - Standard", async () => {
  const timestamp = "DTSTART;TZID=Europe/Berlin:20231106T140000";

  const timezoneString = readFileSync(
    `${__dirname}/fixtures/timezones.ics`,
    "utf8"
  );
  const timezoneStrings = [...timezoneString.matchAll(getTimezoneRegex)].map(
    (match) => match[0]
  );

  const timezones = timezoneStrings.map((timezoneString) =>
    icsTimezoneToObject(timezoneString, undefined)
  );

  const { line } = getLine(timestamp);

  const parsed = icsTimeStampToObject(line, undefined, { timezones });

  expect(parsed.date.getUTCHours()).toEqual(13);

  expect(parsed.local).toBeDefined();
  if (parsed.local) expect(parsed.local?.date.getUTCHours()).toEqual(14);

  expect(() => parsed).not.toThrow();
});

it("Test Ics Timestamp Parse - VTimezones - Daylight", async () => {
  const timestamp = "DTSTART;TZID=Europe/Berlin:20230906T140000";

  const timezoneString = readFileSync(
    `${__dirname}/fixtures/timezones.ics`,
    "utf8"
  );
  const timezoneStrings = [...timezoneString.matchAll(getTimezoneRegex)].map(
    (match) => match[0]
  );

  const timezones = timezoneStrings.map((timezoneString) =>
    icsTimezoneToObject(timezoneString, undefined)
  );

  const { line } = getLine(timestamp);

  const parsed = icsTimeStampToObject(line, undefined, { timezones });

  expect(parsed.date.getUTCHours()).toEqual(12);

  expect(parsed.local).toBeDefined();
  if (parsed.local) expect(parsed.local?.date.getUTCHours()).toEqual(14);

  expect(() => parsed).not.toThrow();
});

it("Test Ics Timestamp Parse - IANA Timezone", async () => {
  const timestamp = "DTSTART;TZID=Europe/Berlin:20230910T020000";

  const { line } = getLine(timestamp);

  const parsed = icsTimeStampToObject(line, undefined, {});

  expect(parsed.date.getUTCHours()).toEqual(0);

  expect(parsed.local).toBeDefined();
  if (parsed.local) expect(parsed.local?.date.getUTCHours()).toEqual(2);

  expect(() => parsed).not.toThrow();
});
