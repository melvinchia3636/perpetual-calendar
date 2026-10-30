function gregorianToJulianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);

  return (
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    b -
    1524.5
  );
}

export interface HijriDate {
  year: number;
  month: number;
  day: number;
}

/** Gregorian → tabular Islamic (civil) calendar. */
export function gregorianToHijri(
  year: number,
  month: number,
  day: number,
): HijriDate {
  let l = Math.floor(gregorianToJulianDay(year, month, day) + 0.5) - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;

  const j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);

  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;

  return {
    year: 30 * n + j - 30,
    month: Math.floor((24 * l) / 709),
    day: l - Math.floor((709 * Math.floor((24 * l) / 709)) / 24),
  };
}
