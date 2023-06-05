import * as StandardModule from 'react-native';

const deprecatedProps = {
  ImagePropTypes: require('deprecated-react-native-prop-types/DeprecatedImagePropType'),
  TextPropTypes: require('deprecated-react-native-prop-types/DeprecatedTextPropTypes'),
  ViewPropTypes: require('deprecated-react-native-prop-types/DeprecatedViewPropTypes'),
  ColorPropType: require('deprecated-react-native-prop-types/DeprecatedColorPropType'),
  EdgeInsetsPropType: require('deprecated-react-native-prop-types/DeprecatedEdgeInsetsPropType'),
  PointPropType: require('deprecated-react-native-prop-types/DeprecatedPointPropType'),
};

const imgProx = new Proxy(StandardModule.Image, {
  get(_, prop) {
    if (prop === 'propTypes') return deprecatedProps.ImagePropTypes;
    return Reflect.get(...arguments);
  },
});

const txtProx = new Proxy(StandardModule.Text, {
  get(_, prop) {
    if (prop === 'propTypes') return deprecatedProps.TextPropTypes;
    return Reflect.get(...arguments);
  },
});

const objProx = new Proxy(StandardModule, {
  get(_, prop) {
    if (prop in deprecatedProps) {
      return deprecatedProps[prop];
    }
    if (prop === 'Image') {
      return imgProx;
    }
    if (prop === 'Text') {
      return txtProx;
    }
    return Reflect.get(...arguments);
  },
});

module.exports = objProx;
