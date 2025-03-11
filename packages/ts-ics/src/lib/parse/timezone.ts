import {
  getTimezoneDaylightRegex,
  getTimezoneStandardRegex,
  replaceTimezoneRegex,
} from "@/constants";
import {
  VTIMEZONE_TO_OBJECT_KEYS,
  type VTimezoneKey,
} from "@/constants/keys/timezone";
import { TimezoneLinesToObject, type VTimezone } from "@/types/timezone";

import { icsDateTimeToDateTime } from "./date";
import { icsTimezonePropToObject } from "./timezoneProp";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { standardValidate } from "./utils/standardValidate";

export const icsTimezoneToObject: TimezoneLinesToObject = (
  rawTimezoneString,
  schema
) => {
  const timezoneString = rawTimezoneString.replace(replaceTimezoneRegex, "");

  const lineStrings = splitLines(
    timezoneString
      .replace(getTimezoneStandardRegex, "")
      .replace(getTimezoneDaylightRegex, "")
  );

  const timezone: Partial<VTimezone> & Required<Pick<VTimezone, "props">> = {
    props: [],
  };

  lineStrings.forEach((lineString) => {
    const { property, line } = getLine<VTimezoneKey>(lineString);

    const objectKey = VTIMEZONE_TO_OBJECT_KEYS[property];

    if (!objectKey) return; // unknown Object key

    if (objectKey === "lastModified") {
      timezone[objectKey] = icsDateTimeToDateTime(line, undefined);

      return;
    }

    timezone[objectKey] = line.value; // Set string value
  });

  const timezoneStandardPropStrings = [
    ...timezoneString.matchAll(getTimezoneStandardRegex),
  ].map((match) => match[0]);

  if (timezoneStandardPropStrings.length > 0) {
    timezoneStandardPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        icsTimezonePropToObject(timezonePropString, undefined, {
          type: "STANDARD",
        })
      );
    });
  }

  const timezoneDaylightPropStrings = [
    ...timezoneString.matchAll(getTimezoneDaylightRegex),
  ].map((match) => match[0]);

  if (timezoneDaylightPropStrings.length > 0) {
    timezoneDaylightPropStrings.forEach((timezonePropString) => {
      timezone.props.push(
        icsTimezonePropToObject(timezonePropString, undefined, {
          type: "DAYLIGHT",
        })
      );
    });
  }

  return standardValidate(schema, timezone as VTimezone);
};
