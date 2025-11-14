import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

export const ToastContext = createContext(null)

export function ToastProvider({ children }){
  const [open, setOpen] = useState(false)
  const [opts, setOpts] = useState({ message: '', severity: 'info', autoHideDuration: 3000 })

  const show = useCallback((message, severity = 'info', autoHideDuration = 3000) => {
    setOpts({ message, severity, autoHideDuration })
    setOpen(true)
  }, [])

  const value = useMemo(()=> ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar open={open} autoHideDuration={opts.autoHideDuration} onClose={()=>setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={()=>setOpen(false)} severity={opts.severity} variant="filled" sx={{ width: '100%' }}>
          {opts.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export function useToast(){
  return useContext(ToastContext)
}
