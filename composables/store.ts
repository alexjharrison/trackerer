import type { Payload, Weight } from "~/types";

const sameDay = (d1: Date, d2 = new Date()) =>
  d1.getDay() === d2.getDay() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

export const useWeights = () => {
  const rawResponse = useAsyncData("weights", () => $fetch("/api/weights"));
  const postWeight = async (weight: Payload) => {
    await $fetch("/api/weights", {
      method: "POST",
      body: weight,
    });

    await rawResponse.refresh();
  };

  const allyWeights = computed(() =>
    (rawResponse.data.value || [])
      .map(w => ({ ...w, date: new Date(w.date) }))
      .filter(({ user }) => user === "Ally")
      .sort((a, b) => a.date.valueOf() - b.date.valueOf())
  );
  const alexWeights = computed(() =>
    (rawResponse.data.value || [])
      .map(w => ({ ...w, date: new Date(w.date) }))
      .filter(({ user }) => user === "Alex")
      .sort((a, b) => a.date.valueOf() - b.date.valueOf())
  );

  const hasAllyPostedToday = computed(() =>
    allyWeights.value.some(w => sameDay(w.date))
  );
  const hasAlexPostedToday = computed(() =>
    alexWeights.value.some(w => sameDay(w.date))
  );

  return {
    postWeight,
    rawResponse,
    alexWeights,
    allyWeights,
    hasAlexPostedToday,
    hasAllyPostedToday,
  };
};
