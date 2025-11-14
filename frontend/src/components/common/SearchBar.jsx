import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({ value, onChange, placeholder = 'Search...', sx, ...props }){
  return (
    <TextField
      size="small"
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={sx}
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  )
}
