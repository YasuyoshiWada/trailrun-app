export const palette = {
  gray:'#A7A5A6',
  aquaLight: '#66ccce',
  navyBlue: '#254d8f',
  cyan: '#23b5bf',
  darkGray: '#586673',
  orange: '#f58530',
  coralRed: '#d84f5f',
  limeGreen: '#62c338',
  textPrimary: '#231f20',
  mustardYellow: '#f5ba30',
  lightGray: '#D9D9D9'
};

export const statusColorMap: Record<string, string> = {
"未受付": palette.gray,
"受付済み": palette.aquaLight,
"DNS": palette.orange,
"スタート": palette.navyBlue,
"地点1": palette.darkGray,
"地点2": palette.cyan,
"DNF": palette.mustardYellow,
"フィニッシュ": palette.limeGreen,
"DQ": palette.coralRed,
};
