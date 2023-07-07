<template>
  <div class="main">
    <h1>Англо-русский словарь</h1>
    <form @submit.prevent class="wrapper">
        <wordInput
            v-model="word.eng"
            type="text"
            placeholder="English version"
        />
        <wordInput
            v-model="word.rus"
            type="text"
            placeholder="Руссикй вариант"
        />
    </form>
    <myButton @click="toTranslate">Перевести</myButton>
    <myButton @click="clearInput">Очистить</myButton>
    <myButton @click="addWord">Добавить</myButton>
    <p class="error" v-if="this.errors">{{this.errors}}</p>
  </div>

</template>

<script>
import WordInput from "@/components/UI/WordInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import createState from './cli/csvParsing'

export default {
  name: 'App',
  components: {
    WordInput,
    MyButton
  },
  data(){
    return {
      words: [],
      word: {
        eng: '',
        rus: '',
      },
      errors: '',
    }
  },
  methods: {
    clearInput() {
      this.word.eng = '';
      this.word.rus = '';
      this.errors = '';
    },
    addWord() {
      if (this.word.eng && this.word.rus) {
        const newWord = { id: Date.now(), ...this.word };
        this.words.push(newWord)
        this.errors = 'слово добавлено'
        this.word.eng = '';
        this.word.rus = '';
        setTimeout(() => {this.errors = ''}, 2000)
      } else {
        this.errors = 'поля не должны быть пустыми'
      }

    },
    toTranslate() {
      const englishWord = this.word.eng;
      const russianWord = this.word.rus;
      if (englishWord && !russianWord) {
        console.log('есть английское, нет русского');
        const findRussianWord = (col, { eng }) => {
          const findWord = col.find(obj => obj.eng === eng);
          return findWord ? findWord.rus : ''
        }
        this.word.rus = findRussianWord(this.words, this.word)
        if(!this.word.rus) {
          this.errors = 'слово не найдено, можете вписать перевод и добавить его в словарь'
        } else {
          this.errors = ''
        }
      }
      if (!englishWord && russianWord) {
        console.log('есть русское, нет английского');
        const findEnglishWord = (col, { rus }) => {
          const findWord = col.find(obj => obj.rus === rus);
          return findWord ? findWord.eng : ''
        }
        this.word.eng = findEnglishWord(this.words, this.word)
        if(!this.word.eng) {
          this.errors = 'слово не найдено, можете вписать перевод и добавить его в словарь'
        } else {
          this.errors = ''
        }
      }
      if(!englishWord && !russianWord) {
        this.errors = 'поля не должны быть пустыми'
      }
      if(englishWord && russianWord) {
        console.log(1)
      }
    }
  },
  async mounted() {
    this.words = await createState();
  }
}
</script>

<style>
body {
  display: flex;
  justify-content: center;
}
h1 {
  color: #1c385e;
}

.main {
  height: 50vh;
  margin: 100px;
  box-sizing: border-box;
  text-align: center;
}

.wrapper {
  display: flex;
  justify-content: space-between;
}

.error {
  margin-top: -20px;
  font-size: 16px;
  color: #c96363;
}

</style>
