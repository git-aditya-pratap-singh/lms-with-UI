
const DateFormet = (date) => {
    if (!date) {
        return null;
    }
    return date.split('T')[0];
}
export default DateFormet;