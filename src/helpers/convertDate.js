const convertDate = (date) => {
  const prependZero = (x) => {
    return x < 10 ? '0' + x : x;
  };

  const D = prependZero(date.getDate());
  // + 1 because month starts with 0
  const M = prependZero(date.getMonth() + 1);
  const Y = date.getFullYear();
  const h = prependZero(date.getHours());
  const m = prependZero(date.getMinutes());

  return `${h}:${m}, ${D}.${M}.${Y}`;
};

export default convertDate;
