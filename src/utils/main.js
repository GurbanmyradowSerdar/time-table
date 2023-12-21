export const sanawjy = [
  {
    first_pair: "Ýokary matematika (umumy) / B11",
    second_pair: "Ekologiýa we daşky gurşawy goramak (umumy) / B11",
    third_pair: "Diskret matematika (amaly) / B11",
  },
  {
    first_pair: "Türkmenistanyň kanunçylyk esaslary (umumy) / B11",
    second_pair: "Türkmenistanyň kanunçylyk esaslary (amaly) / B11",
  },
  {
    first_pair: "Diskret matematika (umumy) / B05",
    second_pair: "Iňlis dili (amaly) / B11",
  },
  {
    first_pair: "Kompýuter grafikasy (umumy) / B11",
    second_pair:
      "topar-1: Ýarymgeçirijili elektronika / W202\ntopar-2: MG we banklary (tejribe) / B05",
    third_pair:
      "topar-1: MG we banklary (tejribe) / A11\ntopar-2: Diskret matematika (tejribe) / W11",
  },
  {
    first_pair: "MG we banklary (umumy) / B11",
    second_pair: "Turkmen dili (amaly) / B11",
    third_pair: "Bedenterbiýe / FOK",
  },
  {
    first_pair: "Ýarymgeçirijili elektronika (umumy) / B11",
    second_pair: "Ýokary matematika (amaly) / B11",
  },
];
export const maydalawjy = [
  {
    first_pair: "Ýokary matematika (umumy) / B11",
    second_pair: "Ekologiýa we daşky gurşawy goramak (amaly) / B11",
    third_pair: "Diskret matematika (amaly) / B11",
  },
  {
    first_pair: "Türkmenistanyň kanunçylyk esaslary (umumy) / B11",
    second_pair:
      "topar-1: Kompýuter grafikasy (tejribe) / B11\ntopar-2:Kompýuter grafikasy (tejribe) / B10",
  },
  {
    first_pair: "Diskret matematika (umumy) / B05",
    second_pair: "Iňlis dili (amaly) / B11",
  },
  {
    first_pair: "Kompýuter grafikasy (umumy) / B11",
    second_pair: "Ýarymgeçirijili elektronika (amaly) / B11",
    third_pair:
      "topar-1: Ýokary matematika (amaly) / B10\ntopar-2: Ýarymgeçirijili elektronika (amaly) / W11",
  },
  {
    first_pair: "MG we banklary (umumy) / B11",
    second_pair: "Turkmen dili (amaly) / B11",
    third_pair: "Bedenterbiýe / FOK",
  },
  {
    first_pair: "Ýarymgeçirijili elektronika (umumy) / B11",
    second_pair:
      "topar-1: Diskret matematika (tejribe) / B05\ntopar-2: Ýokary matematika (tejribe) / B11",
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
