export const untilEndDate = (endDate: Date) =>
  endDate
    ? Math.floor(
        (new Date().getTime() - new Date(endDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

export const dDayConCatString = (endDate: Date) =>
  untilEndDate(endDate) < 0
    ? `D${untilEndDate(endDate)}`
    : `D+${untilEndDate(endDate)}`;
