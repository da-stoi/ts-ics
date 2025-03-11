import { icsStatusStringToStatus, ParseStatusType, statusTypes } from "ts-ics";
import { z } from "zod";

export const zStatusType = z.enum(statusTypes);

export const parseIcsStatus: ParseStatusType = (...props) =>
  icsStatusStringToStatus(zStatusType, ...props);
