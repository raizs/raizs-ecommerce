import moment from 'moment';

export class MiniDatePickerHelper {
  
  static generateDatesObject() {
    const arr = [];

    for(let i = 0; i < 7; i++) {
      const momentSuffix = [
        '[Amanhã]',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
        'dddd'
      ];

      const momentDate = moment().add(i + 1, 'd')
      const date = momentDate.format(`DD/MM - ${momentSuffix[i]}`);
      let [day, weekday] = date.split(' - ');
      day = day.split('/')[0];
      weekday = weekday.split('-')[0];
      const prefix = date.split(' ')[0];
      const suffix = date.split(' ').pop();
      const stockDate = momentDate.format('YYYY-MM-DD');
      let bigSuffix = suffix;

      if(i >= 6) bigSuffix += ` (${date.split(' - ')[0]})`

      arr.push({
        date,
        day,
        weekday,
        prefix,
        suffix,
        bigSuffix,
        value: i,
        momentDate,
        stockDate
      });
    }

    return arr;
  }
}