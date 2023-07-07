// тут мы можем прочитать csv словарь и привести к виду { id: '', eng: '', rus: ''} с учетом того, что списокк прийдет в виде (word, слово)

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
  return state.map((el) => ({ id: i +=1 , eng: el[0], rus: el[1]}));
}

