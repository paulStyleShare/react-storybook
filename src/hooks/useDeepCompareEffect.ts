import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

const useDeepCompareEffect = (effect: EffectCallback, deps: any[]) => {
  const ref = useRef<DependencyList | undefined>(undefined);

  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, ref.current);
};

export default useDeepCompareEffect;
