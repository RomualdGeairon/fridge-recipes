export default (callback) => (e) => {
  if (e.key === 'Enter') {
    callback();
  }
};
