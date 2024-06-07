// ! here we need to change start date to date while we starting the simester
function getWeekLetter() {
  const currentDate = new Date();
  const startDate = new Date("02-12-2024");
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  let weekNumber = Math.floor(days / 7);

  if (typeof weekNumber === "number" && weekNumber % 2 === 0) {
    return "s";
  } else if (typeof weekNumber === "number" && weekNumber % 2 === 1) {
    return "m";
  }
}

function getWeekName(weekLetter) {
  if (weekLetter === "m") return "Maýdalawjy";

  return "Sanawjy";
}

function getNextWeekLetter() {
  const currentWeek = getWeekLetter();

  if (currentWeek === "s") return "m";

  return "s";
}

function getArray(name) {
  if (name === "s") {
    return sanawjy;
  } else {
    return maydalawjy;
  }
}

function getToday(date, week) {
  if (date === 0) {
    // ! hot fix, use pair to show it in UI instead of rest day
    return { first_pair: "Dynç güni" };
  }
  if (week === "m") {
    return maydalawjy[date - 1];
  } else if (week === "s") {
    return sanawjy[date - 1];
  }
}

function getTomorrow(date, week) {
  date += 1;

  if (date === 7) {
    // ! hot fix, use pair to show it in UI instead of rest day
    return { first_pair: "Dynç güni" };
  }

  if (date === 0) {
    // ! hot fix, use pair to show it in UI instead of rest day
    return { first_pair: "Dynç güni" };
  }

  // ! checking if today sunday and tomorrow is monday then we need to change the name of the week
  if (date === 1) {
    if (week === "m") {
      return sanawjy[date - 1];
    } else {
      return maydalawjy[date - 1];
    }
  }

  if (week === "m") {
    return maydalawjy[date - 1];
  } else if (week === "s") {
    return sanawjy[date - 1];
  }
}

// ! setting weeks name
function settingWeeksName() {
  // ! important variables that used in html with ID
  const currentWeekEl = document.getElementById("current-week"),
    nextWeekEl = document.getElementById("next-week");

  currentWeekEl.textContent = getWeekName(getWeekLetter());
  nextWeekEl.textContent = getWeekName(getNextWeekLetter());
}
settingWeeksName();

// ! setting today and tomorrow's schedules
function settingTodayAndTomorrow() {
  const weekName = getWeekLetter(),
    todayDate = new Date().getDay();

  const todaySchedule = getToday(todayDate, weekName),
    tomorrowSchedule = getTomorrow(todayDate, weekName);
  // ! important variables that used in html with ID
  const todayEl = document.getElementById("schedule-today"),
    todayArray = todayEl.querySelectorAll("div"),
    tomorrowEl = document.getElementById("schedule-tomorrow"),
    tomorrowArray = tomorrowEl.querySelectorAll("div");

  // ! one pair
  if (isOnePairOnly(todaySchedule)) {
    settingContentWithOnePair(todayArray, todaySchedule);
  }
  // ! full pairs
  else {
    settingContentFullPairs(todayArray, todaySchedule, todayEl);
  }

  // ? tomorrow
  // ! one pair
  if (isOnePairOnly(tomorrowSchedule)) {
    settingContentWithOnePair(tomorrowArray, tomorrowSchedule);
  }
  // ! full pairs
  else {
    settingContentFullPairs(tomorrowArray, tomorrowSchedule, tomorrowEl);
  }
}
settingTodayAndTomorrow();

// ! only for second_pair and third_pair objects key
function isOnePairOnly(obj) {
  if (
    typeof obj.second_pair === "undefined" &&
    typeof obj.third_pair === "undefined"
  )
    return true;

  return false;
}

// ! setting content if one pair
function settingContentWithOnePair(element, schedule) {
  element.forEach((item, i) => {
    if (i !== 0) {
      item.remove();
    } else {
      item.querySelector("p:first-child").textContent = schedule.first_pair;
      item.querySelector("p:last-child").remove();
    }
  });
}

// ! setting content of 3 pairs
function settingContentFullPairs(elementArray, schedule, element) {
  const separately = (group1, group2) => {
      const el = document.createElement("div");
      el.className = "flex items-center flex-col gap-2";
      el.innerHTML = `
    <p>
      <span
        class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent">1</span>
      ${group1}
    </p>
    <p>
      <span
        class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent">2</span>
      ${group2}
    </p>`;

      return el;
    },
    together = (pair) => {
      const el = document.createElement("div");
      el.className = "flex items-center flex-col gap-2";

      el.innerHTML = `<p>${pair}</p>`;

      return el;
    };

  elementArray.forEach((item) => {
    item.remove();
  });

  // ! 3 pairs initilazing
  const pairs = ["first_pair", "second_pair", "third_pair"];

  pairs.forEach((pair, i) => {
    let pairStr = schedule[pair];

    if (doStudyingTogether(pairStr)) {
      // ! group styding together

      element.append(together(pairStr));
    } else {
      // ! group doesn't styding together

      pairStr = pairStr.split("\n");
      element.append(separately(pairStr[0], pairStr[1]));
    }
  });
}

function doStudyingTogether(pair = "") {
  if (pair.split("\n").length > 1) return false;

  return true;
}

// {
//   <div class="space-y-10">
//       <!-- ! feat: 1. schedule of today and tomorrow, 2. name of the week this week and after this week -->
//       <div
//         class="content space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-3 md:gap-3"
//       >
//         <!-- ! feat: 2. -->
//         <div
//           class="border-2 border-text rounded-lg px-2 py-3 md:col-span-2 md:row-span-1"
//         >
//           <div
//             class="text-lg space-y-3 font-medium size-full flex flex-col justify-between"
//           >
//             <div class="flex items-center justify-between gap-2">
//               <p>Şu hepde:</p>
//               <p
//                 id="current-week"
//                 class="text-xl font-semibold px-4 py-2 border-primary border-2 rounded-lg bg-secondary text-accent"
//               >
//                 Sanawjy
//               </p>
//             </div>
//             <div class="flex items-center justify-between gap-2">
//               <p>Indiki hepde:</p>
//               <p
//                 id="next-week"
//                 class="text-xl font-semibold px-4 py-2 border-primary border-2 rounded-lg bg-secondary text-accent"
//               >
//                 Maýdalawjy
//               </p>
//             </div>
//           </div>
//         </div>
//         <!-- ! feat: 1. -->
//         <div
//           class="border-2 border-text rounded-lg md:col-span-1 md:row-span-2"
//         >
//           <div
//             class="text-lg font-medium flex flex-col justify-between size-full *:px-2 *:py-3 text-center relative [&>*:nth-child(3)]:border-t-2 [&>*:nth-child(4)]:border-t-2 *:border-text"
//             id="schedule-today"
//           >
//             <!-- ! background text -->
//             <span
//               class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 -z-1 text-accent -z-[1] text-7xl opacity-20 flex items-center justify-center text-center min-w-[300px]"
//             >
//               <p class="w-full">Şu gün</p>
//             </span>
//             <div class="flex items-center flex-col gap-2">
//               <p>Filosofiýa (umumy) / B11</p>
//               <p></p>
//             </div>
//             <div
//               class="border-t-2 border-text flex items-center flex-col gap-2"
//             >
//               <p>
//                 <span
//                   class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                   >1</span
//                 >
//                 Operasion ulgamlar (tejribe) / A09
//               </p>
//               <p>
//                 <span
//                   class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                   >2</span
//                 >
//                 Operasion ulgamlar (tejribe) / B10
//               </p>
//             </div>
//             <div
//               class="border-t-2 border-text flex items-center flex-col gap-2"
//             >
//               <p>Awtomatiki dolandyryşyň nazaryýeti SD (amaly) / B04</p>
//               <p></p>
//             </div>
//           </div>
//         </div>
//         <div
//           class="border-2 border-text rounded-lg md:col-span-1 md:row-span-2"
//         >
//           <div
//             class="text-lg font-medium flex flex-col justify-between size-full *:px-2 *:py-3 text-center relative [&>*:nth-child(3)]:border-t-2 [&>*:nth-child(4)]:border-t-2 *:border-text"
//             id="schedule-tomorrow"
//           >
//             <!-- ! background text -->
//             <span
//               class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 -z-1 text-accent -z-[1] text-7xl opacity-20 flex items-center justify-center text-center min-w-[300px]"
//             >
//               <p class="w-full">Ertir</p>
//             </span>
//             <div class="flex items-center flex-col gap-2">
//               <p>MG we banklary (umumy) / B11</p>
//               <p></p>
//             </div>
//             <div
//               class="border-t-2 border-text flex items-center flex-col gap-2"
//             >
//               <p>
//                 <span
//                   class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                   >1</span
//                 >
//                 Elektrotehnika we elektronikanyň esaslary (tejribe) / W3??
//               </p>
//               <p>
//                 <span
//                   class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                   >2</span
//                 >
//                 MG we banklary (tejribe) / A09
//               </p>
//             </div>
//             <div
//               class="border-t-2 border-text flex items-center flex-col gap-2"
//             >
//               <p>Bedenterbiýe / FOK</p>
//               <p></p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- ! warning text -->
//       <div class="flex flex-col items-center gap-5 content">
//         <h2 class="text-center text-3xl uppercase tracking-widest font-bold">
//           sanawjy we maydalawjy hepdeleriň raspisaniyasy
//         </h2>
//         <div class="size-14 animate-bounce">
//           <svg
//             class="size-full object-cover"
//             width="800px"
//             height="800px"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12 4V20M12 20L8 16M12 20L16 16"
//               class="stroke-primary"
//               stroke-width="2"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             />
//           </svg>
//         </div>
//       </div>
//       <!-- ! feat: tables of schedule -->
//       <div class="content space-y-10">
//         <!-- ! sanawjy -->
//         <div
//           class="border-2 border-text rounded-lg px-2 py-3 space-y-3 bg-secondary"
//         >
//           <h2 class="text-center text-3xl text-primary font-bold">Sanawjy</h2>
//           <!-- ! monday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Filosofiýa (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>MG we banklary (amaly) / A04</p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Elektrotehnika we elektronikanyň esaslary (amaly) / W305</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! tuesday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Elektrotehnika we elektronikanyň esaslary (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >1</span
//                   >
//                   Operasion ulgamlar (tejribe) / A09
//                 </p>
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >2</span
//                   >
//                   Operasion ulgamlar (tejribe) / B10
//                 </p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Elektrotehnika we elektronikanyň esaslary (umumy) / B11</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! wednesday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Awtomatiki dolandyryşyň nazaryýeti SD (amaly) / B04</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >1</span
//                   >
//                   MG we banklary (tejribe) / A11
//                 </p>
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >2</span
//                   >
//                   Elektrotehnika we elektronikanyň esaslary (tejribe) / W305
//                 </p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Operasion ulgamlar (amaly) / A11</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! thursday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>MG we banklary (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>Bedenterbiýe / FOK</p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Elektrotehnika we elektronikanyň esaslary (amaly) / W305</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! friday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Önümçilik / praktika</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! saturday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Operasion ulgamlar (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >1</span
//                   >
//                   Elektrotehnika we elektronikanyň esaslary (tejribe) / W305
//                 </p>
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >2</span
//                   >
//                   MG we banklary (tejribe) / A09
//                 </p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Iňlis dili (amaly) / A08</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <!-- ! maydalawjy -->
//         <div
//           class="border-2 border-text rounded-lg px-2 py-3 space-y-3 bg-secondary"
//         >
//           <h2 class="text-center text-3xl text-primary font-bold">
//             Maýdalawjy
//           </h2>
//           <!-- ! monday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Filosofiýa (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>Filosofiýa (söhbet) / A04</p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Elektrotehnika we elektronikanyň esaslary (amaly) / W305</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! tuesday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Awtomatiki dolandyryşyň nazaryýeti SD (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >1</span
//                   >
//                   Operasion ulgamlar (tejribe) / A09
//                 </p>
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >2</span
//                   >
//                   Operasion ulgamlar (tejribe) / B10
//                 </p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Elektrotehnika we elektronikanyň esaslary (umumy) / B11</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! wednesday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div class="flex items-center flex-col gap-2">
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >1</span
//                   >
//                   Awtomatiki dolandyryşyň nazaryýeti SD (tejribe) / A08
//                 </p>
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >2</span
//                   >
//                   Awtomatiki dolandyryşyň nazaryýeti SD (tejribe) / A04
//                 </p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >1</span
//                   >
//                   MG we banklary (tejribe) / A11
//                 </p>
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >2</span
//                   >
//                   Elektrotehnika we elektronikanyň esaslary (tejribe) / W305
//                 </p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Operasion ulgamlar (amaly) / A11</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! thursday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>MG we banklary (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>Bedenterbiýe / FOK</p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Elektrotehnika we elektronikanyň esaslary (amaly) / W305</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! friday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Önümçilik / praktika</p>
//               </div>
//             </div>
//           </div>
//           <!-- ! saturday -->
//           <div class="border-2 bg-background border-text rounded-lg">
//             <div class="text-lg font-medium *:px-2 *:py-3 text-center">
//               <div>
//                 <p>Operasion ulgamlar (umumy) / B11</p>
//               </div>
//               <div
//                 class="border-t-2 border-text flex items-center flex-col gap-2"
//               >
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >1</span
//                   >
//                   Elektrotehnika we elektronikanyň esaslary (tejribe) / W305
//                 </p>
//                 <p>
//                   <span
//                     class="px-2 font-semibold border-primary border-2 rounded-lg bg-secondary text-accent"
//                     >2</span
//                   >
//                   MG we banklary (tejribe) / A09
//                 </p>
//               </div>
//               <div class="border-t-2 border-text">
//                 <p>Iňlis dili (amaly) / A08</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
// }
