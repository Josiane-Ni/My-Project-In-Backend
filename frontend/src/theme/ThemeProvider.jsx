import React, { useMemo, useState, createContext } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

export const ThemeModeContext = createContext({ dark: false, toggle: () => {} })

export default function ThemeProvider({children}){
  const [dark, setDark] = useState(()=> localStorage.getItem('theme') === 'dark')
  const theme = useMemo(()=> createTheme({ palette: { mode: dark ? 'dark' : 'light' } }), [dark])
  const toggle = ()=> { const next=!dark; setDark(next); localStorage.setItem('theme', next?'dark':'light') }
  return (
    <ThemeModeContext.Provider value={{ dark, toggle }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  )
}
