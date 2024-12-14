// hàm này dùng để kiểm tra một thời điểm có phải hôm nay không
const isToday = (inputDate) => {
    const date = new Date(inputDate);

    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
};

export default isToday;
