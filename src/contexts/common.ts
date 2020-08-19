import React from 'react';

import UserAgent from '~utils/useragent';

export interface CommonContextValues {
  locale: {
    country: string;
    language: string;
  };
  useragent: UserAgent;
}

const CommonContext = React.createContext<CommonContextValues>({
  locale: {
    country: 'KR',
    language: 'ko',
  },
  useragent: new UserAgent(),
});

export default CommonContext;
