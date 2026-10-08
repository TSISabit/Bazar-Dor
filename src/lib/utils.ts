export const toBengaliNumber = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return "০";
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const getBanglaDate = (): string => {
  // স্ট্যাটিক সেফ ডেট যা সার্ভার ও ক্লায়েন্টে ১০০% ম্যাচ করবে
  const today = new Date();
  const day = today.getDate();
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  const days = [
    "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
  ];
  return `${days[today.getDay()]}, ${toBengaliNumber(day)} ${months[today.getMonth()]}, ${toBengaliNumber(today.getFullYear())}`;
};