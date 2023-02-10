export const roundOffNumber = (views: number): string => {
  if (views < 1000) {
    return views.toString();
  } else if (views < 10000) {
    return (views / 1000).toFixed(1) + 'k';
  } else if (views < 1000000) {
    return (views / 1000).toFixed(0) + 'k';
  } else {
    return (views / 1000000).toFixed(1) + 'm';
  }
};
