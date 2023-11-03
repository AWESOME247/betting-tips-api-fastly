export const yesterdayDate = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date();
  const yesterday = new Date(d);
  yesterday.setDate(d.getDate() - 1);
  const day = yesterday.getDate();
  const getCurrentMonth = () => {
    if (d.getDate() === 1) {
      return months[d.getMonth() - 1];
    }
    return months[d.getMonth()];
  };
  const month = getCurrentMonth();
  return {
    year: d.getFullYear(),
    lastMonth: d.getMonth(),
    day: d.getDay(),
    month,
    yesterday: day
  }
};
