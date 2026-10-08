export const toBengaliNumber = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return "০";
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const getBanglaDate = (): string => {
  return new Intl.DateTimeFormat('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
};