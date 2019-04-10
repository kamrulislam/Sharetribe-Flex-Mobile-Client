import React from 'react';
import T from 'prop-types';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  ViewPropTypes,
} from 'react-native';
import A, { Easing } from 'react-native-reanimated';
import {
  Reanimatable,
  createAnimationConfig,
} from 'react-native-reanimatable';
import { isAndroid } from '../../utils';
import s from './styles';
import { dimensions } from '../../styles';
import IconFonts from '../IconFonts/IconFonts';

const AnimatedTextInput = A.createAnimatedComponent(TextInput);

const animationConfig = createAnimationConfig({
  animation: {
    type: 'timing',
    duration: 350,
    easing: Easing.inOut(Easing.poly(5)),
  },
  values: {
    fontSize: { from: 14, to: 11 },
    translateYLabel: {
      from: isAndroid ? -2 : 0,
      to: isAndroid
        ? -dimensions.indent * 1.5
        : -dimensions.indent * 1.2,
    },
    translateY2Input: { from: 0, to: 0 },
  },
});

const AnimatedFormInput = ({
  inputStyle,
  containerStyle,
  textInputRef = React.createRef(),
  label,
  labelContainerStyle,
  labelStyle,
  onInputPress,
  chevronRight,
  value = '',
  placeholder,
  active,
  iconName,
  onPressIcon,
  ...props
}) => (
  <TouchableWithoutFeedback>
    <View
      style={[
        s.animatedContainer,
        containerStyle,
        active && s.activeContainer,
      ]}
    >
      <Reanimatable
        value={active || (!!value && value.length > 0)}
        config={animationConfig}
      >
        {({ fontSize, translateYLabel, translateY2Input }) => (
          <View>
            <A.Text
              style={[
                s.inputLabel,
                labelStyle,
                {
                  fontSize,
                  transform: [{ translateY: translateYLabel }],
                },
                !active &&
                  !!value &&
                  value.length === 0 &&
                  s.placeholder,
                active && s.activeLabel,
              ]}
            >
              {placeholder}
            </A.Text>
            <AnimatedTextInput
              {...props}
              hitSlop={{
                top: 32,
                bottom: 32,
                right: 8,
                left: 8,
              }}
              value={value}
              style={[
                s.input,
                !!iconName && s.inputWithIcon,
                inputStyle,
                {
                  transform: [{ translateY: translateY2Input }],
                },
              ]}
              ref={textInputRef}
            />
            {!!iconName && (
              <IconFonts
                name={iconName}
                size={16}
                style={s.icon}
                onPress={onPressIcon}
              />
            )}
          </View>
        )}
      </Reanimatable>
    </View>
  </TouchableWithoutFeedback>
);

AnimatedFormInput.propTypes = {
  inputStyle: T.any,
  containerStyle: ViewPropTypes.style,
  labelContainerStyle: ViewPropTypes.style,
  labelStyle: ViewPropTypes.style,
  textInputRef: T.object,
  label: T.string,
  onInputPress: T.func,
  placeholderTextColor: T.string,
  noBorder: T.bool,
  chevronRight: T.bool,
  value: T.string,
  placeholder: T.string,
  active: T.bool,
  iconName: T.string,
  onPressIcon: T.func,
};

export default AnimatedFormInput;
