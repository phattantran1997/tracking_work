import {FontSize} from './FontSize';

export const settingFont = {
  normal: '400',
  bold: '700',
};

export const TextStyles = {
  header: {
    fontWeight: settingFont.bold as 'bold',
    fontSize: FontSize.size_32,
    lineHeight: FontSize.size_32 * 1.5,
  },
  heading: {
    fontWeight: settingFont.bold as 'bold',
    fontSize: FontSize.size_26,
    lineHeight: FontSize.size_26 * 1.5,
  },
  normal: {
    fontWeight: settingFont.normal as 'normal',
    fontSize: FontSize.size_20,
    lineHeight: FontSize.size_20 * 1.5,
  },
  subNormal: {
    fontWeight: settingFont.normal as 'normal',
    fontSize: FontSize.size_16,
    lineHeight: FontSize.size_16 * 1.5,
  },
};

export const textVariants = {
  textXl: 'text-4xl font-bold ',
  textLg: 'text-2xl font-bold ',
  textMd: 'text-base ',
  textSm: 'text-sm ',
};
