export const allProjectImages: string[] = [
  "/images/gh_1.png", "/images/gh_2.png", "/images/gh_3.png", "/images/gh_4.png", "/images/gh_5.png",
  "/images/crimson_1.png", "/images/crimson_2.png", "/images/crimson_3.png", "/images/crimson_4.png", "/images/crimson_5.png", "/images/crimson_6.png",
  "/images/the_owl.png", "/images/owl_rest_api.png", "/images/IPSA.png",
  "/images/ipsa_model_1.png", "/images/ipsa_model_2.png",
  "/images/PrettyProfile_1.png", "/images/PrettyProfile_2.png",
  "/images/LogInsight_1.png", "/images/LogInsight_2.png", "/images/LogInsight_3.png", "/images/LogInsight_4.png",
  "/images/Crimson.png", "/images/grabber.png", "/images/IStealU.png", "/images/Thunder.png", "/images/ProxySniffer.png",
  "me_2.jpg", "me.png",
];

export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
