
export function formatDateShort(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month},${year}`;
}

export function randomDateShort(): string {
  // losowa data między 1900 a dziś
  const start = new Date(1900, 0, 1).getTime();
  const end = Date.now();
  const random = new Date(start + Math.random() * (end - start));
  return formatDateShort(random);
}


export function createDateSafe(day: number, month: number, year: number): Date {
  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12");
  }
  if (day < 1 || day > 31) {
    throw new Error("Day must be between 1 and 31");
  }

  return new Date(year, month - 1, day);
}


//const randomDate = getRandomPastDate();      // last 25y
//const randomDate10 = getRandomPastDate(10);  // last 10y

export function getRandomPastDate(yearsBack: number = 25): Date {
  const now = new Date();

  const startYear = now.getFullYear() - yearsBack;
  const randomYear = getRandomInt(startYear, now.getFullYear());
  const randomMonth = getRandomInt(0, 11); // 0–11
  const randomDay = getRandomInt(1, 28);   // 1–28 

  return new Date(randomYear, randomMonth, randomDay);
}

/** Losowa liczba całkowita z zakresu min–max (włącznie) */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
