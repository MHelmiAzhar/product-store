import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Button from '@mui/material/Button'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'
import { SnackbarProvider } from './context/snackBarContext.jsx' // Import SnackbarProvider

function App() {
  return (
    <SnackbarProvider>
      {' '}
      {/* Bungkus seluruh aplikasi dengan SnackbarProvider */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </SnackbarProvider>
  )
}

export default App
