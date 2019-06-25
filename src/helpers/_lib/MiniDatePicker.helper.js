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


  /**
   * generateIntervalDatesObject - generates the next n days with 14 days interval
   *
   * @param {string} dateString - date in format YYYY-MM-DD
   * @param {number} n - number of dates to be generated
   * @memberof MiniDatePickerHelper
   */
  static generateIntervalDatesArray(dateString, interval = 14, offset = 0, n = 5) {
    const arr = [];
    for(let i = 0; i < n; i++) {
      arr.push(moment(dateString).add(offset + i * interval, 'd').format('DD/MM'));
    }
    
    return arr;
  }

  /**
   * getDaty - gets day of week
   *
   * @param {string} dateString - date in format YYYY-MM-DD
   * @memberof MiniDatePickerHelper
   */
  static getDay(dateString) {
    return moment(dateString).format('dddd');
  }
}