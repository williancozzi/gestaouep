export const images = [
  "/loginBg/1.jpg",
  "/loginBg/2.jpg",
  "/loginBg/3.webp",
  "/loginBg/4.jpg",
  "/loginBg/5.webp",
  "/loginBg/6.jpg",
  "/loginBg/7.jpg",
  "/loginBg/8.webp",
  "/loginBg/9.webp",
  "/loginBg/10.jpg",
  "/loginBg/11.jpg",
  "/loginBg/12.webp",
  "/loginBg/13.png",
  "/loginBg/14.webp",
  "/loginBg/15.jpg",
  "/loginBg/16.jpg",
  "/loginBg/17.webp",
  "/loginBg/18.webp",
  "/loginBg/19.png",
  "/loginBg/20.webp",
  "/loginBg/21.webp",
  "/loginBg/22.jpg",
  "/loginBg/23.jpg",
  "/loginBg/24.png",
  "/loginBg/25.png",
  "/loginBg/26.webp",
  "/loginBg/27.jpg",
  "/loginBg/28.jpg",
  "/loginBg/29.jpg",
  "/loginBg/30.jpg",
  "/loginBg/31.jpg",
  "/loginBg/32.jpg",
  "/loginBg/33.webp",
  "/loginBg/34.webp",
  "/loginBg/35.webp",
  "/loginBg/36.jpg",
  "/loginBg/37.png",
  "/loginBg/38.jpg",
  "/loginBg/39.webp",
  "/loginBg/40.jpg",
  "/loginBg/41.jpg",
  "/loginBg/42.jpg",
  "/loginBg/43.webp",
  "/loginBg/44.jpg",
  "/loginBg/45.webp",
  "/loginBg/46.png",
  "/loginBg/47.jpg",
  "/loginBg/48.jpg",
  "/loginBg/49.webp",
  "/loginBg/50.jpg",
];

export function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}