import { UserOverviewOnlyPictureIdSchema } from '~schemas/user';

import { PictureSchema } from './picture';

interface Highlight {
  end: number;
  start: number;
}

interface Replay {
  highlights: Highlight[];
  url: string;
  viewCount: number;
}

export interface LivetvSchema {
  author: UserOverviewOnlyPictureIdSchema;
  endedAt: string; // ISO-8601
  entranceMessage: string;
  id: string; // UUID
  originalHeight: number;
  originalWidth: number;
  picture: PictureSchema;
  replay?: Replay;
  shareUrl: string;
  status: string;
  title: string;
  url: string;
  watcherCount: number;
}
