exports.differenceInMinutes = (date1, date2) => {
  const diff = parseInt(date1 / 60000 - date2 / 60000);
  return diff;
};

exports.calculate_age = (dob) => {
  var diff_ms = Date.now() - dob;
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

exports.getDMY = (obj) => {
  const date = new Date(obj);
  return `${date.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${(date.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${date.getFullYear()}`;
};

exports.getMDY = (obj) => {
  const date = new Date(obj);
  return `${(date.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${date.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${date.getFullYear()}`;
};
