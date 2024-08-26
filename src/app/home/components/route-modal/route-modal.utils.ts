export function getDiffInMinutes(
  fromIsoTime: string,
  toIsoTime: string,
): number | undefined {
  if (!fromIsoTime || !toIsoTime) {
    return undefined;
  }
  const time1 = new Date(fromIsoTime);
  const time2 = new Date(toIsoTime);
  const diff = time2.getTime() - time1.getTime();
  const minuteInMilliseconds = 60_000;
  const minutes = Math.floor(diff / minuteInMilliseconds);
  return minutes;
}
