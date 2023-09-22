import Color from 'color';

/* eslint-disable no-magic-numbers */
export const formatLikesCount = (likes: number) => {
  if (likes < 1000) {
    return likes.toString();
  } else if (likes < 1000000) {
    return `${(likes / 1000).toFixed(1)}k`;
  }
  return `${(likes / 1000000).toFixed(1)}m`;
};

export const getInvertedColor = (color: string) => {
  const hexColor = Color(color).hex();

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const isLight = (r + g + b) / 3 > 128;

  return isLight ? '#000000' : '#ffffff';
};

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};
