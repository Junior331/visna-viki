import { useEffect, useState } from 'react';

interface ColorHookProps {
  color: string;
  opacityValue?: number;
  brightnessAmount?: number;
}

const useColorManipulation = ({
  color,
  opacityValue = 30,
  brightnessAmount = 30
}: ColorHookProps) => {
  const [lighterColor, setLighterColor] = useState<string>('');

  useEffect(() => {
    const lightenColor = (hex: string) => {
      const hexToRgb = (hex: string) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const fullHex = hex.replace(
          shorthandRegex,
          (r, g, b) => r + r + g + g + b + b
        );
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
          fullHex
        );
        if (result) {
          const [, r, g, b] = result;
          return {
            r: parseInt(r, 16),
            g: parseInt(g, 16),
            b: parseInt(b, 16)
          };
        } else {
          throw new Error('Invalid color format');
        }
      };

      const rgb = hexToRgb(hex);
      if (!rgb) return '';

      const adjustBrightness = (colorValue: number, amount: number) => {
        return Math.min(Math.max(0, colorValue + amount), 255);
      };

      const adjustedR = adjustBrightness(rgb.r, brightnessAmount);
      const adjustedG = adjustBrightness(rgb.g, brightnessAmount);
      const adjustedB = adjustBrightness(rgb.b, brightnessAmount);

      const toHex = (colorValue: number) => {
        const hex = colorValue.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };

      const newColor = `#${toHex(adjustedR)}${toHex(adjustedG)}${toHex(
        adjustedB
      )}`;
      return newColor.toUpperCase() + toHex(opacityValue);
    };

    try {
      const lightenedColor = lightenColor(color);
      setLighterColor(lightenedColor);
    } catch (error) {
      console.error('Error while processing color:', error);
    }
  }, [color, brightnessAmount, opacityValue]);

  return { lighterColor };
};

export default useColorManipulation;
