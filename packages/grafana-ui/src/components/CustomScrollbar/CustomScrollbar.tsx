import React, { PureComponent } from 'react';
import Scrollbars from 'react-custom-scrollbars';

interface Props {
  customClassName?: string;
  autoHide?: boolean;
  autoHideTimeout?: number;
  autoHideDuration?: number;
  hideTracksWhenNotNeeded?: boolean;
}

/**
 * Wraps component into <Scrollbars> component from `react-custom-scrollbars`
 */
export class CustomScrollbar extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    customClassName: 'custom-scrollbars',
    autoHide: true,
    autoHideTimeout: 200,
    autoHideDuration: 200,
    hideTracksWhenNotNeeded: false,
  };

  render() {
    const { customClassName, children, ...scrollProps } = this.props;

    return (
      <Scrollbars
        className={customClassName}
        autoHeight={true}
        // These autoHeightMin & autoHeightMax options affect firefox and chrome differently.
        // Before these where set to inhert but that caused problems with cut of legends in firefox
        autoHeightMin={'0'}
        autoHeightMax={'100%'}
        renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
        renderTrackVertical={props => <div {...props} className="track-vertical" />}
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" />}
        renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
        renderView={props => <div {...props} className="view" />}
        {...scrollProps}
      >
        {children}
      </Scrollbars>
    );
  }
}

export default CustomScrollbar;
