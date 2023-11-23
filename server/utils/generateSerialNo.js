let initial = 1000;

const serial_no_generator = () => {
  return `SNO${Math.random().toString(36).substring(2, 10)}`;
};

module.exports = serial_no_generator;
