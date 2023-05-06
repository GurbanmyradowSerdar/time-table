export const sanawjy = [
  {
    first_pair: "Ýokary matematika (umumy) / B11",
    second_pair: "Psihologiýa (söhbet) / B11",
  },
  {
    first_pair: "Çyzuw (umumy) / W09",
    second_pair: "Ýokary matematika (amaly) / B11",
  },
  {
    first_pair: "Iňlis dili (amaly) / B11",
    second_pair: "Bedenterbiýe / FOK",
  },
  {
    first_pair: "Psihologiýa (umumy) / B11",
    second_pair:
      "topar-1: Programmirleme (tejribe) / B11\ntopar-2: Fizika (tejribe) / W412",
  },
  {
    first_pair: "Fizika (umumy) / B11",
    second_pair: "Programmirleme (umumy) / B11",
  },
  {
    first_pair: "Programmirleme (amaly) / B11",
    second_pair: "Fizika (amaly) / B11",
  },
];
export const maydalawjy = [
  {
    first_pair: "Ýokary matematika (umumy) / B11",
    second_pair:
      "topar-1: H.Z.K.T (tejribe) / B11\ntopar-2: Çyzuw (amaly) / W08",
  },
  {
    first_pair: "H.Z.K.T (umumy) / B11",
    second_pair: "Ýokary matematika (amaly) / B11",
  },
  {
    first_pair: "Iňlis dili (amaly) / B11",
    second_pair: "Bedenterbiýe / FOK",
  },
  {
    first_pair:
      "topar-1: Fizika (tejribe) / B06\ntopar-2: Programmirleme (tejribe) / B11",
    second_pair:
      "topar-1: Çyzuw (amaly) / W08\ntopar-2: H.Z.K.T (tejribe) / B11",
  },
  {
    first_pair: "Fizika (umumy) / B11",
    second_pair: "Nazary mehanika (amaly) / B11",
  },
  {
    first_pair: "Programmirleme (amaly) / B11",
    second_pair: "Nazary mehanika (umumy) / B11",
  },
];

export function getTheNameOfWeek() {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  let weekNumber = Math.ceil(days / 7);

  if (typeof weekNumber === "number" && weekNumber % 2 === 0) {
    return "m";
  } else if (typeof weekNumber === "number" && weekNumber % 2 === 1) {
    return "s";
  }
}

export function getArray(name) {
  if (name === "s") {
    return sanawjy;
  } else {
    return maydalawjy;
  }
}

export function getToday(date, week) {
  if (date === 0) {
    return "Dynç güni";
  }
  let weekNumber = "";
  if (week === "m") {
    weekNumber = "m";
    return maydalawjy[date - 1];
  } else if (week === "s") {
    weekNumber = "s";
    return sanawjy[date - 1];
  }
}
