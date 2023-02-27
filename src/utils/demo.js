const obj = {
  id: 1,
  name: "fin",
};
const handleObj = {};
for (let key in obj) {
  handleObj.key = obj[key];
}

console.log(handleObj);
