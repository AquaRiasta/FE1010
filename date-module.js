function FCDate(
  day = 6,
  start = 19.5,
  contestLength = 3,
  interval = 7,
  timezone = 7
) {
  /*
  Module for iterating date and convert between timezone for FreeContest.
  Parameters (all must be Number):
    day: day in week (0:Sunday -> 6: Saturday)
    start: start time in hour 
    contestLength: length in hour
    interval: number of days between contests
    timezone: parameters timezone (only apply for day and start)
  
  Em tạo module này tại em nghĩ là bài này sẽ
  không được dùng các module có sẵn trên mang.

  Nhưng mà em lại cũng không biết cách đổi timezone
  cho JS Date như nào cả 😞. Nếu anh đọc code em,
  ở function begin và end em đã lấy thời gian của UTC
  và cộng/trừ độ chênh lệch, em không biết là nó có ổn
  hay không nhưng mà bí bách quá ạ 😢
  */

  Array.prototype.slice.call(arguments).forEach((element) => {
    if (typeof element !== "number") throw Error("Parameters must be Number");
  });

  // day name preset for Vietnamese
  let dayName = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;
  const msInWeek = msInDay * 7;

  // convert local time to UTC
  const startUTC =
    start -
    timezone +
    (start - timezone < 0) * 24 -
    (start - timezone >= 24) * 24;
  const dayUTC =
    day -
    (start - timezone < 0) +
    (day - (start - timezone < 0) < 0) * 7 -
    (day + (start - timezone >= 24) >= 7) * 7;

  // initialize date
  const dateUTC = Date.now();
  let nextOccurrence =
    dateUTC -
    ((dateUTC - (dateUTC % msInDay)) % msInWeek) +
    msInDay * (dayUTC - 4) - // move day to last occurrence day in UTC
    (dateUTC % msInDay) + // move time to 00:00:00 UTC
    startUTC * msInHour; // move time to start of contest

  // move to the next occurrence
  function next() {
    nextOccurrence += msInDay * interval;
  }

  // convert date to local time string
  function begin() {
    const temp = new Date(nextOccurrence + timezone * msInHour);
    return {
      date: temp.toISOString().split("T")[0],
      time: temp.toISOString().split("T")[1].split(".")[0],
      timezone: `UTC${timezone == 0 ? "" : timezone < 0 ? "" : "+" + timezone}`,
      ms: Math.floor((nextOccurrence + timezone * msInHour) / 1000) * 1000,
      day: dayName[dayUTC],
    };
  }

  function end() {
    const temp = new Date(
      nextOccurrence + (timezone + contestLength) * msInHour
    );
    return {
      date: temp.toISOString().split("T")[0],
      time: temp.toISOString().split("T")[1].split(".")[0],
      timezone: `UTC${timezone == 0 ? "" : timezone < 0 ? "" : "+" + timezone}`,
      ms:
        Math.floor(
          (nextOccurrence + (timezone + contestLength) * msInHour) / 1000
        ) * 1000,
    };
  }

  // return methods
  return {
    next: next,
    begin: begin,
    end: end,
  };
}

export default FCDate;
