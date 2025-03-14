import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { 
  Canvas, 
  Skia,
  Path,
  BlurMask,
  Circle,
} from '@shopify/react-native-skia'
import { useSharedValue, useAnimatedReaction, withTiming, useDerivedValue, Easing } from "react-native-reanimated";

import { styles } from './styles'
import { THEME } from '../../styles/theme'

type Props = TouchableOpacityProps & {
  checked: boolean
  title: string
}

const CHECK_SIZE = 28
const CHECK_STROKE = 2
const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2
const CENTER_CIRCLE = RADIUS / 2

export function Option({ checked, title, ...rest }: Props) {
  const percentage = useSharedValue(0)
  const circle = useSharedValue(0)

  const skiaPercentage = useDerivedValue(() => {
    return percentage.value;
  }, [percentage]);

  const skiaCircle = useDerivedValue(() => {
    return circle.value;
  }, [circle]);

  const path = Skia.Path.Make()
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS)

  useAnimatedReaction(
    () => checked,
    (isChecked) => {
      percentage.value = withTiming(isChecked ? 1 : 0, { duration: 700 });
      circle.value = withTiming(isChecked ? CENTER_CIRCLE : 0, {
        easing: Easing.linear,
      });
    },
    [checked]
  );

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>

      <Canvas style={{ width: CHECK_SIZE * 2, height: CHECK_SIZE * 2 }}>
        <Path 
          path={path} 
          color={THEME.COLORS.GREY_500}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path 
          path={path} 
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={skiaPercentage}
        >
          <BlurMask blur={1} style="solid"/>
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={skiaCircle}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={1} style="solid"/>
        </Circle>
      </Canvas>
    </TouchableOpacity>
  )
}
