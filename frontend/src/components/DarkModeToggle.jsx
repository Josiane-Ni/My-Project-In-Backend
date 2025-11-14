import React, { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { ThemeModeContext } from '../theme/ThemeProvider'

export default function DarkModeToggle(){
  const { dark, toggle } = useContext(ThemeModeContext)
  return (
    <Tooltip title={dark? 'Light mode' : 'Dark mode'}>
      <IconButton color="inherit" onClick={toggle} size="small">
        {dark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  )
}
