exports.onClientEntry = () => {
  window.randV = Math.floor(Math.random() * (90 - 10) + 10);
  window.randH = Math.floor(Math.random() * (90 - 10) + 10);
  window.randF = Math.random() * (7 - 1) + 1;
}