export const convertToWordedDate = (date: string) => {
  const dateElements = date.split('-');
  const day = parseInt(dateElements[2]);
  const month = parseInt(dateElements[1]);
  const year = parseInt(dateElements[0]);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const ordinal =
    day > 3 && day < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][day % 10];

  return `${day}${ordinal} ${monthNames[month - 1]} ${year}`;
};
