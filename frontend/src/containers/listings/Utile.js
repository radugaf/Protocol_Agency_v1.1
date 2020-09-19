import moment from 'moment';

export function dateDiffrence(lastDate, type = '') {
  const diffrence = moment().diff(lastDate, 'days');
  if (type === 'vechime') {
    return `${diffrence} days`;
  }
  if (diffrence <= 1) {
    return `Today | ${moment(lastDate).format('mm:ss')}`;
  } else if (diffrence > 1 && diffrence <= 2) {
    return `Yesterday | ${moment(lastDate).format('mm:ss')}`;
  }
  return moment(lastDate).format('DD MM YYYY');
}

export const dateFormat = 'DD/MM/YYYY';
