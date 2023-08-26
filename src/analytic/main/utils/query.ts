import dayjs from "dayjs";

export const buildAnd = (expressions: any[]) => {
  let results: any[] = expressions.map((v: string[]) => {
    return joinExpression(v)
  })

  return ['(', results.join(' '), ')'].join('');
}

export const buildOr = (expressions: any[]) => {
  let results: any[] = expressions.map((v: string[]) => {
    return joinExpression(v)
  })

  return ['{', results.join(' '), '}'].join('');
}

export const joinExpression = (expressions: string[]) => {
  return expressions.join('');
}

export const makeDateQueryStr = (key: string, start: dayjs.Dayjs, end: dayjs.Dayjs): string => {
  return [`${key}>="${start.toISOString()}"`, `${key}<="${end.toISOString()}"`].join(' ');
}

export const getThisYearQueryStr = (key: string = 'createdAt'): string => {
  const dayJsUtc = dayjs().utc();
  return makeDateQueryStr(key, dayJsUtc.startOf('year'), dayJsUtc.endOf('year'));
}

export const defaultDateQueryStr = getThisYearQueryStr()
export const queryStrAssignToMe = "assignToUser=ME"
export const defaultAssignToGroupMeQueryStr = "assignToGroup=MY_GROUP"