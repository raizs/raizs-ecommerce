import moment from 'moment';

export class MiniDatePickerHelper {
  
  static generateDatesObject() {
    const arr = [];

    for(let i = 0; i < 7; i++) {
      const momentSuffix = [
        '[Hoje]',
        '[Amanhã]',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd'
      ];

      const date = moment().add(i, 'd').format(`DD/MM - ${momentSuffix[i]}`);
      const prefix = date.split(' ')[0];
      const suffix = date.split(' ').pop();
      let bigSuffix = suffix;

      if(i >= 6) bigSuffix += ` (${date.split(' - ')[0]})`

      arr.push({
        date,
        prefix,
        suffix,
        bigSuffix,
        value: i
      });
    }

    return arr;
  }
}