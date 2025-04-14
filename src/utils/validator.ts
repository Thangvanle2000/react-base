export const validatePhone = (_: any, value: any) => {
    // Bỏ qua validate nếu giá trị rỗng
    if (value.length === 0) {
        return Promise.resolve();
    }
    // Kiểm tra xem giá trị có phải là một số và có độ dài từ 8 đến 11 chữ số
    const numberRegex = /^[0-9]+$/;

    // Kiểm tra nếu giá trị bắt đầu bằng +84
    const startsWithPlus84 = /^\+84/;

    if (
        (numberRegex.test(value) || startsWithPlus84.test(value)) &&
        value.length >= 8 &&
        value.length <= 11
    ) {
        return Promise.resolve();
    } else {
        return Promise.reject("Số điện thoại không hợp lệ");
    }
};