const getMonthDayYearFromUTCDate = (utcDate) => {
  const date = new Date(utcDate);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export default getMonthDayYearFromUTCDate;
