export const sanawjy = [
  {
    first_pair: "Filosofiýa (umumy) / B11",
    second_pair: "MG we banklary (amaly) / A04",
    third_pair: "Elektrotehnika we elektronikanyň esaslary (amaly) / A08",
  },
  {
    first_pair: "Elektrotehnika we elektronikanyň esaslary (umumy) / B11",
    second_pair:
      "topar-1: Operasion ulgamlar (tejribe) / A09\ntopar-2: Operasion ulgamlar (tejribe) / B10",
    third_pair: "Elektrotehnika we elektronikanyň esaslary (umumy) / B11",
  },
  {
    first_pair: "Awtomatiki dolandyryşyň nazaryýeti SD (amaly) / B04",
    second_pair:
      "topar-1: MG we banklary (tejribe) / A11\ntopar-2: Elektrotehnika we elektronikanyň esaslary (tejribe) / A10",
    third_pair: "Operasion ulgamlar (amaly) / A11",
  },
  {
    first_pair: "MG we banklary (umumy) / B11",
    second_pair: "Bedenterbiýe / FOK",
    third_pair: "Elektrotehnika we elektronikanyň esaslary (amaly) / B11",
  },
  {
    first_pair: "Önümçilik / praktika",
  },
  {
    first_pair: "Operasion ulgamlar (umumy) / B11",
    second_pair:
      "topar-1: Elektrotehnika we elektronikanyň esaslary (tejribe) / W11\ntopar-2: MG we banklary (tejribe) / A09",
    third_pair: "Iňlis dili (amaly) / A08",
  },
];
export const maydalawjy = [
  {
    first_pair: "Filosofiýa (umumy) / B11",
    second_pair: "Filosofiýa (söhbet) / A04",
    third_pair: "Elektrotehnika we elektronikanyň esaslary (amaly) / A08",
  },
  {
    first_pair: "Awtomatiki dolandyryşyň nazaryýeti SD (umumy) / B11",
    second_pair:
      "topar-1: Operasion ulgamlar (tejribe) / A09\ntopar-2: Operasion ulgamlar (tejribe) / B10",
    third_pair: "Elektrotehnika we elektronikanyň esaslary (umumy) / B11",
  },
  {
    first_pair:
      "topar-1: Awtomatiki dolandyryşyň nazaryýeti SD (tejribe) / A08\ntopar-2: Awtomatiki dolandyryşyň nazaryýeti SD (tejribe) / A04",
    second_pair:
      "topar-1: MG we banklary (tejribe) / A11\ntopar-2: Elektrotehnika we elektronikanyň esaslary (tejribe) / A10",
    third_pair: "Operasion ulgamlar (amaly) / A11",
  },
  {
    first_pair: "MG we banklary (umumy) / B11",
    second_pair: "Bedenterbiýe / FOK",
    third_pair: "Operasion ulgamlar (umumy) / B11",
  },
  {
    first_pair: "Önümçilik / praktika",
  },
  {
    first_pair: "Operasion ulgamlar (umumy) / B11",
    second_pair:
      "topar-1: Elektrotehnika we elektronikanyň esaslary (tejribe) / W11\ntopar-2: MG we banklary (tejribe) / A09",
    third_pair: "Iňlis dili (amaly) / A08",
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
