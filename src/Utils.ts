import moment, { Moment } from 'moment';
/**
 * It formats a datetime to the format of DD/MM/YYYY H:mm:ss
 * @param {Moment} datetime - Moment
 * @returns A string.
 */
export const formatDatetimeToInformal = (datetime: Moment) => {
  return moment(datetime).format('DD/MM/YYYY H:mm:ss');
};

/**
 * It takes a date and formats it to a more informal format.
 * @param {Moment} date - Moment
 * @returns A string.
 */
export const formatDateToInformal = (date: Moment) => {
  return moment(date).format('DD/MM/YYYY');
};
/**
 * It formats a number into a string with a currency symbol.
 * @param {number} amount - The amount of money to format.
 * @param {string} [currency] - The currency code.
 * @returns A string.
 */
export function formatMoney(amount: number, currency?: string): string {
  if (!amount) {
    amount = 0;
  }
  return `${new Intl.NumberFormat('la-LA').format(amount)} ${
    currency ? currency : ''
  }`;
}
/**
 * It takes a file and returns a promise that resolves to a base64 string.
 * @param {any} file - The file that you want to upload.
 * @returns A promise.
 */
export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * "Cut a string to a certain length, if it's longer than the specified length, cut it and add ellipsis
 * at the end."
 *
 * The function is pretty simple, but it's not very readable. Let's break it down into smaller pieces
 * @param {string} text - The string to be cut.
 * @param {number} [quantity=10] - The number of characters to return.
 * @returns A string.
 */
export const cutString = (text: string, quantity: number = 10) => {
  const index = text.length;
  if (index > quantity) {
    return `${text.substring(0, quantity)}...`;
  }
  return text;
};
/**
 * If a > b, return 1. If a < b, return -1. Otherwise, return 0
 * @param {string} a - The first string to compare.
 * @param {string} b - The string to compare to a.
 * @returns 1
 */
export const sortString = (a: string, b: string) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

/**
 * Given a date, return a string that can be used in a query to the API
 * @param {Moment} date - Moment
 * @returns The date in the format YYYY-MM-DDT00:00:00Z
 */
export const formatDateForQuery = (date: Moment) => {
  return `${moment(date).format('YYYY-MM-DDT00:00:00')}Z`;
};
