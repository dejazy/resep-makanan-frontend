import dayjs from "dayjs";
dayjs().format();

export const formatDate = (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss")