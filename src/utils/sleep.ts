export default (timeout: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
