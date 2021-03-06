
/**
 * Generates random phone numbers
 * @param {string} limit
 * @returns {array}
 */
const generateNumbers = () => {
    let results = [];
    const timestamp = +new Date();
    for (let index = 0; index < 10; index++) {
        let max    = 100000000;
        let min    = 10000000; // Math.pow(10, n) basically
        let number = Math.floor( Math.random() * (max - min + 1) ) + min;
        results.push({
            id: index + 1,
            value: "081-" + (("" + number).substring(1)),
            timestamp
        });
    }
    return results;
};

const isUnique = (data) => {
    if(!data.length) return true;
    let hashTable = Object.create(null);
    const removePrefix = obj => obj.value.replace(/-/g, '');
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const value = removePrefix(element);
        if(value in hashTable) {
            return false;
        }
        hashTable[value] = true;
      }
      return true;
}

module.exports = {
    generateNumbers,
    isUnique,
};