interface UAPlatform {
  android: boolean;
  facebookWebview: boolean;
  iOS: boolean;
  oldChrome: boolean;
  opera: boolean;
}

interface AppVersion {
  major: number;
  minor: number;
  patch: number;
}

export default class UserAgent {
  private static instance: UserAgent;
  /**
   * user-agent string 그대로
   */
  useragent!: string;
  /**
   * 스타일쉐어 웹뷰인지
   */
  isFromApp!: boolean;
  /**
   * 모바일 기기인지
   */
  isMobile!: boolean;
  /**
   * 어떤 플랫폼인지
   */
  platforms!: UAPlatform;

  constructor() {
    if (!UserAgent.instance) {
      if (typeof window !== 'undefined') {
        this.useragent = window.navigator.userAgent.toLowerCase();
      } else {
        this.useragent = '';
      }

      this.isFromApp = this.useragent.includes('styleshare');
      this.isMobile = Boolean(
        this.useragent.match(/(ipad|iphone|ipod|android)/gi),
      );
      this.platforms = {
        android: Boolean(this.useragent.match(/(android)/gi)),
        facebookWebview: this.useragent.includes('fb'),
        iOS: Boolean(this.useragent.match(/(ipad|iphone|ipod)/gi)),
        oldChrome: (() => {
          const chromeVersion = /chrome\/(\d+.\d+)/.exec(this.useragent);

          if (!chromeVersion) {
            return this.useragent.includes('chrome');
          } else {
            return (
              this.useragent.includes('chrome') &&
              parseInt(chromeVersion[1], 10) <= 25
            );
          }
        })(),
        opera: Boolean(/opr\/\d+.\d+/i.exec(this.useragent)),
      };

      UserAgent.instance = this;
    }

    return UserAgent.instance;
  }

  getiOSVersion = ():
    | undefined
    | {
        major: number;
        minor: number;
        patch: number;
      } => {
    const result = new RegExp(/StyleShare-iOS\/(\d+\.\d+\.\d+)/).exec(
      window.navigator.userAgent,
    );

    if (result) {
      const [major, minor, patch] = result[1].split('.');
      return {
        major: parseInt(major, 10),
        minor: parseInt(minor, 10),
        patch: parseInt(patch, 10),
      };
    }
  };

  getAOSVersion = ():
    | undefined
    | { major: number; minor: number; patch: number } => {
    const result = new RegExp(
      /StyleShare-Android\/version \((\d+\.\d+\.\d+).*\)/,
    ).exec(window.navigator.userAgent);

    if (result) {
      const [major, minor, patch] = result[1].split('.');
      return {
        major: parseInt(major, 10),
        minor: parseInt(minor, 10),
        patch: parseInt(patch, 10),
      };
    }
  };

  // is first version released later than second version
  isAfterVersion = (versionA: AppVersion, versionB: AppVersion): boolean => {
    const { major: majorA, minor: minorA, patch: patchA } = versionA;
    const { major: majorB, minor: minorB, patch: patchB } = versionB;
    if (
      majorA < majorB ||
      (majorA === majorB && minorA < minorB) ||
      (majorA === majorB && minorA === minorB && patchA < patchB)
    ) {
      return false;
    }

    return true;
  };
}
