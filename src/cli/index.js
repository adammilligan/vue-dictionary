
export default async () => {
  async function getDictionary() {
    return await fetch('/dictionary.csv')
      .then(response => response.text())
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }

  const dictionary = await getDictionary()

  const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
    data
      .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
      .split('\n')
      .map(v => v.split(delimiter));

  const dictionaryToArray = CSVToArray(dictionary, ',', true);

  const state = dictionaryToArray.filter(subArray => subArray.length > 1);

  let i = 0
  return state.map((el) => ({ id: i +=1 , eng: el[0], ru: el[1]}));
}
// //
// // // const findWord = (arr, word) => {
// // //   const currentWord = word.toLowerCase();
// // //   const result = arr.filter((el) => el[0] === currentWord)
// // //   if (result.length === 0) {
// // //     return 'нет такого слова в словаре, хотите добавить?'
// // //   }
// // //   return result[0][1]
// // // }
// //
// //
// // //
// // // const word = {
// // //   eng: 'pen',
// // //   rus: 'ручка'
// // // }
// // //
// // // const addWordInDictionary = (arr, { eng, rus }) => {
// // //   const result = [];
// // //   result.push(eng, rus)
// // //   return arr.push(result);
// // // }
// // //
// // // // console.log(addWordInDictionary(word))
// // //
// // //
// // // addWordInDictionary(state, word)
// // //
// // // console.log(state)

