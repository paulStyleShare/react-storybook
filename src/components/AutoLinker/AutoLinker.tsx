import React from 'react';
import stringReplace from 'react-string-replace';

import { AltLink } from '~components/common';

const hashtagRule = /#([\S]+)/g;

type Props = {
  /**
   * @default false
   */
  disableHashtag?: boolean;
  // disableMention?: boolean;
  // disableUrl?: boolean;
};

const AutoLinker: React.FC<Props> = ({ children, disableHashtag = false }) => {
  if (typeof children === 'undefined' || children === null) {
    return null;
  }

  let converted: React.ReactNode = children.toString();

  if (!disableHashtag) {
    converted = stringReplace(children.toString(), hashtagRule, (match, i) => (
      <AltLink
        key={`${match}${i}`}
        css="color: #004894"
        href={`stsh://feed/hashtag/${encodeURI(match)}`}
      >
        {`#${match}`}
      </AltLink>
    ));
  }

  return <>{converted}</>;
};

export default AutoLinker;
