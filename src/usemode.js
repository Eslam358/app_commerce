import { useSelector, useDispatch } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { toggleTheme } from './reduxtoolkit/slice/global/theme';
import { useMemo } from 'react';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          text: {
            primary: '#2B3445',
          },
          body_color: {
            primary: '#f6f6f6',
          },
          grey_: {
            primary: grey[100],
          },
          bg_main: {
            primary: '#f3f5f9',
          },
          neutral: {
            main: '#64748B',
          },
          favColor: {
            main: grey[300],
          },
          red_main: {
            main: '#d23f57',
            primary: '#e94560',
          },
        }
      : {
          neutral: {
            main: '#64748B',
          },
          bg_main: {
            primary: '#999',
          },
          grey_: {
            primary: grey[600],
          },
          favColor: {
            main: grey[800],
          },
          body_color: {
            primary: grey[900],
          },
          text: {
            primary: '#fff',
          },
          red_main: {
            main: '#d23f57',
            primary: '#e94560',
          },
        }),
  },
});

export const useMode = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return [
    theme,
    {
      toggleColorMode: () => dispatch(toggleTheme()),
    },
  ];
};
