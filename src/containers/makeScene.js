/**
 * Created by tiangen on 16/8/30.
 */
import React, {
  Component,
  PropTypes,
} from 'react';

import {
  InteractionManager,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
function makeScene(ComposedComponent) {
  class ScenePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
      }
    }

    componentDidMount() {
      InteractionManager.runAfterInteractions(()=> {
        this.setState({ loaded: true });
      });
    }

    render() {
      if (!this.state.loaded) {
        return null;
      }
      const { style, ...otherProps } = this.props;
      return (
        <ComposedComponent
          {...otherProps}
          style={[styles.container, style]}
        />
      );
    }
  }
  ScenePage.propTypes = {
    name: PropTypes.string.isRequired,
  };
  return ComposedComponent;
}
module.exports = makeScene;