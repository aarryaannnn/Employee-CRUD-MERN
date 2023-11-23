const filter_removeSensitiveInfo = (dataObj, ...removeFields) => {
  const newData = {};

  const prevData = JSON.parse(JSON.stringify(dataObj));
  //   console.log(prevData);

  Object.keys(prevData).forEach((el) => {
    if (!removeFields.includes(el)) {
      newData[el] = prevData[el];
    }
  });

  // console.log(newData);
  // console.log(removeFields);

  return newData;
};

module.exports = filter_removeSensitiveInfo;
