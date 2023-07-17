export const getShortSurahList = async () => {
  const data = await import("../../../../assets/data/allSurah.json");

  await new Promise((resolve) => setTimeout(resolve, 500));

  return data.default;
};
