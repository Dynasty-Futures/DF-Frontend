const isEnabled = (value: string | null) => value === "1" || value === "true";

export interface PerfFlags {
  noHeroVideo: boolean;
  noAtmosphere: boolean;
  noBlur: boolean;
}

export const getPerfFlags = (): PerfFlags => {
  if (typeof window === "undefined") {
    return {
      noHeroVideo: false,
      noAtmosphere: false,
      noBlur: false,
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    noHeroVideo: isEnabled(params.get("noHeroVideo")),
    noAtmosphere: isEnabled(params.get("noAtmosphere")),
    noBlur: isEnabled(params.get("noBlur")),
  };
};
