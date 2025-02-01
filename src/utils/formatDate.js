// Format date as YYYY-MM-DD.
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d.toISOString().split("T")[0];
};

export default formatDate;
