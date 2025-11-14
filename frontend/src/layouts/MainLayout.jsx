import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Header from '../components/common/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/common/Sidebar'

export default function MainLayout({ children }){
  return (
    <>
      <Header />
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, ml: '220px' }}>
          <Container sx={{ mt: 3, minHeight: '70vh' }}>
            {children}
          </Container>
          <Footer />
        </Box>
      </Box>
    </>
  )
}
