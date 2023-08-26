/**
 *
 * @param inputDate string iso date
 */
export function CheckOnTime(inputDate: string): boolean {
  const inDate = new Date(inputDate);
  const today = new Date();
  if (inDate.toString() !== 'Invalid Date' && inDate.getTime() >= today.getTime()) {
    return true;
  }
  return false;
}

export function CalculateOverdueDay(resolution: string, response: string): number {
  const resolutionDate = new Date(resolution);
  const responseDate = new Date(response);
  if (resolutionDate.toString() !== 'Invalid Date' && resolutionDate.getTime() >= responseDate.getTime()) {
    return resolutionDate.getDate() - responseDate.getDate();
  }
  return 0;
}
