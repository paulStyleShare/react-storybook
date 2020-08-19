import React, { Children, Component } from 'react';
import styled from 'styled-components';

import { Box } from '~components/common';

type Props = {
  perView: number;
  gutter: number;
  trackPadding: number;
};

type State = {
  wrapperWidth: number;
};

export default class Slider extends Component<
  Props & React.ComponentProps<typeof Box>,
  State
> {
  state: State = {
    wrapperWidth: 0,
  };

  ref = React.createRef<HTMLDivElement>();

  setWrapperWidth = () => {
    if (this.ref.current) {
      const wrapperWidth = this.ref.current.offsetWidth;

      this.setState({ wrapperWidth });
    }
  };

  componentDidMount() {
    this.setWrapperWidth();

    window.addEventListener('resize', this.setWrapperWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWrapperWidth);
  }

  render() {
    const { children, perView, gutter, trackPadding, ...props } = this.props;
    const { wrapperWidth } = this.state;

    const childrenCount = Children.count(children);

    const slideWidth = wrapperWidth / perView - trackPadding + gutter;
    const trackWidth = childrenCount * slideWidth;

    return (
      <Wrapper {...props} ref={this.ref}>
        <div
          css={`
            display: flex;
          `}
          style={{
            margin: `0 ${-gutter / 2}px`,
            padding: `0 ${trackPadding}px`,
            width: trackWidth,
          }}
        >
          {Children.map(children, (child, index) => (
            <div
              key={index}
              css={`
                flex-shrink: 0;
              `}
              style={{
                padding: `0 ${gutter / 2}px`,
                width: slideWidth,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Box)`
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
`;
