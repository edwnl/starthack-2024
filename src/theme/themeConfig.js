// Define base colors
const colors = {
  light: {
    primary: '#ffffff',
    text: 'rgba(0, 0, 0, 0.88)',
    textSecondary: 'rgba(0, 0, 0, 0.65)',
    hover: 'rgba(0, 0, 0, 0.4)',
    active: 'rgba(0, 0, 0, 0.15)',
  },
  dark: {
    primary: '#1f1f1f',
    text: 'rgba(255, 255, 255, 0.85)',
    textSecondary: 'rgba(255, 255, 255, 0.65)',
    hover: 'rgba(255, 255, 255, 0.08)',
  },
  black: '#000000',
  lightAccent: "rgba(5, 5, 5, 0.06)"
};

const themeConfig = {
  token: {
    colorPrimary: colors.black,
    colorPrimaryHover: colors.light.hover,
    colorBgContainer: colors.light.primary,
    colorBgLayout: colors.light.primary,
    colorBgBase: colors.light.primary,
    colorText: colors.light.text,
    colorTextSecondary: colors.light.textSecondary,
    colorBorder: colors.dark.primary,
    colorBorderSecondary: colors.dark.primary,
    colorBgTextActive: colors.light.active,
    
    // Dark mode tokens
    colorBgContainerDark: colors.dark.primary,
    colorBgLayoutDark: colors.dark.primary,
    colorBgBaseDark: colors.dark.primary,
    colorTextDark: colors.dark.text,
    colorTextSecondaryDark: colors.dark.textSecondary,
  },
  components: {
    Layout: {
      headerBg: colors.light.primary,
      headerColor: colors.light.text,
    },
    Menu: {
      // Light theme
      itemBg: colors.light.primary,
      itemColor: colors.light.text,
      itemSelectedBg: colors.light.primary,
      itemSelectedColor: colors.dark.primary,
      itemHoverBg: colors.light.hover,
      itemHoverColor: colors.dark.primary,
      
      // Dark theme
      darkItemBg: colors.dark.primary,
      darkItemColor: colors.dark.text,
      darkItemSelectedBg: colors.dark.primary,
      darkItemSelectedColor: colors.light.primary,
      darkItemHoverBg: colors.dark.hover,
      darkItemHoverColor: colors.light.primary,
    },
    Divider: {
        colorSplit: colors.lightAccent
    }
  },
};

export default themeConfig;