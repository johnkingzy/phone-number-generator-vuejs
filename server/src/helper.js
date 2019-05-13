
/**
 * Generates random phone numbers
 * @param {string} limit
 * @returns {array}
 */
const generateNumbers = () => {
    let results = [];
    for (let index = 0; index < 10; index++) {
        let max    = 100000000;
        let min    = 10000000; // Math.pow(10, n) basically
        let number = Math.floor( Math.random() * (max - min + 1) ) + min;
        results.push({
            id: index + 1,
            value: "081-" + (("" + number).substring(1)),
            timestamp: +new Date
        });
    }
    return results;
};

const isUnique = (data) => {
    if(!data.length) return true;
    let hashTable = Object.create(null);
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element in hashTable) {
            return false;
        }
        hashTable[element] = true;
      }
      return true;
}

module.exports = {
    generateNumbers,
    isUnique,
};