import { Question, questionDataSource } from '../../dataSource/questions';

const questionLimitCount = 18;

const shuffle = ([...array]: Question[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const createQuestions = () => {
  const clone = [...questionDataSource];
  const indexList: number[] = [];
  for (let i = 0; i < questionLimitCount; i++) {
    while (true) {
      const random = Math.floor(Math.random() * clone.length);
      if (!indexList.includes(random)) {
        indexList.push(random);
        break;
      }
    }
  }
  const questions = indexList.map((i) => {
    return clone[i];
  });
  const displayOrderQuestions = shuffle(questions);
  return { questions, displayOrderQuestions };
};
