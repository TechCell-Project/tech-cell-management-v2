import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeLocale from 'dayjs/plugin/relativeTime';

import 'dayjs/locale/vi';

dayjs.extend(updateLocale);
dayjs.extend(relativeLocale);

dayjs.updateLocale('vi', {
  relativeTime: {
    future: 'trong %s',
    past: '%s trước',
    s: 'Vài giây',
    m: '1 giây',
    mm: '%d giây',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
});
