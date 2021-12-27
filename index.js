import FCDate from "./date-module.js";

// create table element
const table = document.createElement("table");
table.innerHTML += `
  <tr>
    <th>Ngày</th>
    <th>Thời gian bắt đầu</th>
    <th>Thời gian kết thúc</th>
  </tr>`;

const date = FCDate();

// iterate contests
const numberOfContest = 2;
for (let i = 0; i < numberOfContest; ++i) {
  date.next();
  const begin = date.begin();
  const end = date.end();

  // insert row with date details to table
  table.innerHTML += `
  <tr>
    <td>
      <div>${begin.date}</div>
      <div>(${begin.day})</div>
    </td>
    <td>
      <div>${begin.date} ${begin.time} ${begin.timezone}</div>
      <div>(${begin.ms})</div>
    </td>
    <td>
      <div>${end.date} ${end.time} ${end.timezone}</div>
      <div>(${end.ms})</div>
    </td>
  </tr>`;
}

document.body.append(table);