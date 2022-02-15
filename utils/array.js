const findItemById = (items, itemId) => {
  return items.find((item) => item._id.toString() === itemId)
}

const findItemIndexById = (items, itemId) =>  {
  return items.findIndex((item) => item._id?.toString() === itemId)
}

const removeIdFromArray = (items, itemId) => {
  return items.filter((item) => item._id.toString() !== itemId)
}

const distinctValuesFromArray = (item, index, self) =>  {
  return self.indexOf(item) === index
}

module.exports = {
  findItemById,
  findItemIndexById,
  removeIdFromArray,
  distinctValuesFromArray
}