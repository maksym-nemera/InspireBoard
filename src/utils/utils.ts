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
  const originalColor = Color(color);
  const invertedColor = originalColor.negate();

  return invertedColor.hex();
};
