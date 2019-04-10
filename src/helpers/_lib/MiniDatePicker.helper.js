import moment from 'moment';

export class MiniDatePickerHelper {
  
  static generateDatesObject() {
    const arr = [];

    for(let i = 0; i < 7; i++) {
      const momentSuffix = [
        '[HOJE]',
        '[AMANHÃ]',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd'
      ];

      const date = moment().add(i, 'd').format(`DD/MM - ${momentSuffix[i]}`);
      const suffix = date.split(' ').pop();

      arr.push({
        date,
        suffix,
        value: i
      });
    }

    return arr;
  }
}