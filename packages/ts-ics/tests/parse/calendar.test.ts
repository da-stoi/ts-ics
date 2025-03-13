import { convertIcsCalendar } from "@/lib/parse/calendar";
import { icsTestData } from "../utils";
import { readFile } from "node:fs/promises";
import { z } from "zod";

it("Test Ics Calendar Parse", async () => {
  const calendar = icsTestData([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//hacksw/handcal//NONSGML v1.0//EN",
    "BEGIN:VEVENT",
    "UID:19970610T172345Z-AF23B2@example.com",
    "DTSTAMP:19970610T172345Z",
    "DTSTART:19970714T170000Z",
    "DTEND:19970715T040000Z",
    "SUMMARY:Bastille Day Party",
    "END:VEVENT",
    "END:VCALENDAR",
  ]);
  expect(() => convertIcsCalendar(undefined, calendar)).not.toThrow();
});

it("Test Ics Calendar Parse", async () => {
  const calendar = icsTestData([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:http://www.example.com/calendarapplication/",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Berlin",
    "BEGIN:STANDARD",
    "DTSTART:16011028T030000",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
    "TZOFFSETFROM:+0200",
    "TZOFFSETTO:+0100",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:16010325T020000",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0200",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    "UID:461092315540@example.com",
    `ORGANIZER;CN="Alice Balder, Example Inc.":MAILTO:alice@example.com`,
    "LOCATION:Irgendwo",
    "GEO:48.85299;2.36885",
    "SUMMARY:Eine Kurzinfo",
    `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`,
    `ATTENDEE;DELEGATED-FROM="mailto:immud@example.com":mailto:ildoit@example.co`,
    " m",
    "DESCRIPTION:Beschreibung des Termins",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
    "CLASS:PUBLIC",
    "DTSTART;TZID=Europe/Berlin:20200910T220000Z",
    "DTEND;TZID=Europe/Berlin:20200919T215900Z",
    "DTSTAMP:20200812T125900Z",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-PT2H",
    "DESCRIPTION:Mozilla Standardbeschreibung",
    "END:VALARM",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "UID:461092315540@example.com",
    `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US?`,
    ` ??(cn=John%20Smith)":mailto:jsmith@example.com`,
    "LOCATION:Irgendwo",
    "GEO:48.85299;2.36885",
    "SUMMARY:Eine Kurzinfo",
    "DESCRIPTION:Beschreibung des Termins",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
    "CLASS:PUBLIC",
    "DTSTART;TZID=Europe/Berlin:20200910T220000Z",
    "DURATION:P15DT5H0M20S",
    "DTSTAMP:20200812T125900Z",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-PT2H",
    "DESCRIPTION:Mozilla Standardbeschreibung",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]);
  expect(() => convertIcsCalendar(undefined, calendar)).not.toThrow();
});

it("Test Ics Calendar Parse", async () => {
  const calendar = icsTestData([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "METHOD:PUBLISH",
    "PRODID:-//schulferien.org//iCal Generator//DE",
    "BEGIN:VEVENT",
    "CREATED:20230930T032002Z",
    "LAST-MODIFIED:20230930T032002Z",
    "DTSTAMP:20230930T032002Z",
    "SUMMARY:Winterferien 2023 Sachsen",
    "DTSTART;VALUE=DATE:20230213",
    "DTEND;VALUE=DATE:20230225",
    "URL:http://www.schulferien.org",
    "DESCRIPTION:Alle Termine auf www.schulferien.org",
    "TRANSP:TRANSPARENT",
    "UID:F_2023_termin651777ca02085@schulferien.org",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "CREATED:20230930T032002Z",
    "LAST-MODIFIED:20230930T032002Z",
    "DTSTAMP:20230930T032002Z",
    "SUMMARY:Osterferien 2023 Sachsen",
    "DTSTART;VALUE=DATE:20230407",
    "DURATION:P15DT5H0M20S",
    "URL:http://www.schulferien.org",
    "DESCRIPTION:Alle Termine auf www.schulferien.org",
    "TRANSP:TRANSPARENT",
    "UID:F_2023_termin651777ca020f1@schulferien.org",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "CREATED:20230930T032002Z",
    "LAST-MODIFIED:20230930T032002Z",
    "DTSTAMP:20230930T032002Z",
    "SUMMARY:Pfingstferien 2023 Sachsen",
    "DTSTART;VALUE=DATE:20230519",
    "DTEND;VALUE=DATE:20230520",
    "URL:http://www.schulferien.org",
    "DESCRIPTION:Alle Termine auf www.schulferien.org",
    "TRANSP:TRANSPARENT",
    "UID:F_2023_termin651777ca02123@schulferien.org",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "CREATED:20230930T032002Z",
    "LAST-MODIFIED:20230930T032002Z",
    "DTSTAMP:20230930T032002Z",
    "SUMMARY:Sommerferien 2023 Sachsen",
    "DTSTART;VALUE=DATE:20230710",
    "DTEND;VALUE=DATE:20230819",
    "URL:http://www.schulferien.org",
    "DESCRIPTION:Alle Termine auf www.schulferien.org",
    "TRANSP:TRANSPARENT",
    "UID:F_2023_termin651777ca02150@schulferien.org",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "CREATED:20230930T032002Z",
    "LAST-MODIFIED:20230930T032002Z",
    "DTSTAMP:20230930T032002Z",
    "SUMMARY:Herbstferien 2023 Sachsen",
    "DTSTART;VALUE=DATE:20231002",
    "DTEND;VALUE=DATE:20231015",
    "URL:http://www.schulferien.org",
    "DESCRIPTION:Alle Termine auf www.schulferien.org",
    "TRANSP:TRANSPARENT",
    "UID:F_2023_termin651777ca021a0@schulferien.org",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "CREATED:20230930T032002Z",
    "LAST-MODIFIED:20230930T032002Z",
    "DTSTAMP:20230930T032002Z",
    "SUMMARY:Herbstferien 2023 Sachsen",
    "DTSTART;VALUE=DATE:20231030",
    "DTEND;VALUE=DATE:20231031",
    "URL:http://www.schulferien.org",
    "DESCRIPTION:Alle Termine auf www.schulferien.org",
    "TRANSP:TRANSPARENT",
    "UID:F_2023_termin651777ca021f7@schulferien.org",
    "END:VEVENT",
    "BEGIN:VEVENT",
    "CREATED:20230930T032002Z",
    "LAST-MODIFIED:20230930T032002Z",
    "DTSTAMP:20230930T032002Z",
    "SUMMARY:Weihnachtsferien 2023 Sachsen",
    "DTSTART;VALUE=DATE:20231223",
    "DTEND;VALUE=DATE:20240103",
    "URL:http://www.schulferien.org",
    "DESCRIPTION:Alle Termine auf www.schulferien.org",
    "TRANSP:TRANSPARENT",
    "UID:F_2023_termin651777ca02240@schulferien.org",
    "END:VEVENT",
    "END:VCALENDAR",
  ]);
  expect(() => convertIcsCalendar(undefined, calendar)).not.toThrow();
});

it("Parse Apple ICS Calendar", async () => {
  const buffer = await readFile(`${__dirname}/fixtures/apple.ics`, "utf8");
  const calendar = buffer.toString();

  expect(() => convertIcsCalendar(undefined, calendar)).not.toThrow();
});

it("Leftover line breaks should not affect parsing - #130", async () => {
  const calendar = icsTestData([
    "BEGIN:VCALENDAR",
    "PRODID:ID",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "CREATED:20240112T095511Z",
    "DTEND:20240112T105511Z",
    "DTSTAMP:20240112T095511Z",
    "DTSTART:20240112T095511Z",
    "SUMMARY:Test",
    "UID:d908f270-64fa-4916-9f72-b48eb7222a64",
    "END:VEVENT",
    "END:VCALENDAR",
  ]);

  expect(() => convertIcsCalendar(undefined, calendar)).not.toThrow();
});

it("Test non standard value", async () => {
  const nonStandardValue = "year";

  const calendarString = icsTestData([
    "BEGIN:VCALENDAR",
    "PRODID:ID",
    "VERSION:2.0",
    `X-WTF:${nonStandardValue}`,
    "BEGIN:VEVENT",
    "CREATED:20240112T095511Z",
    "DTEND:20240112T105511Z",
    "DTSTAMP:20240112T095511Z",
    "DTSTART:20240112T095511Z",
    "SUMMARY:Test",
    "UID:d908f270-64fa-4916-9f72-b48eb7222a63",
    "END:VEVENT",
    "END:VCALENDAR",
  ]);

  const calendar = convertIcsCalendar(undefined, calendarString, {
    nonStandard: {
      wtf: {
        name: "X-WTF",
        convert: (line) => line.value,
        schema: z.string(),
      },
    },
  });

  expect(calendar.nonStandard?.wtf).toBe(nonStandardValue);
});
