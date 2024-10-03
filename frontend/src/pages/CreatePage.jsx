import React, { useState } from 'react'
import { Button, Snackbar, Alert } from '@mui/material'
import { useProductStore } from '../store/product'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: null,
    image: ''
  })
  const { createProduct } = useProductStore()

  // State untuk mengontrol Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success') // Bisa 'success', 'error', dll.

  const handleNewProduct = async () => {
    const { success, message } = await createProduct(newProduct)

    // Set pesan Snackbar berdasarkan hasil
    setSnackbarMessage(message)
    setSnackbarSeverity(success ? 'success' : 'error')
    setSnackbarOpen(true) // Buka Snackbar
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false) // Tutup Snackbar
  }

  return (
    <div className="flex flex-col w-full justify-center items-center h-[500px]">
      <p className="text-gray-300 font-medium text-xl">Create New Product</p>
      <input
        type="text"
        placeholder="name"
        className="bg-transparent p-3 w-96 border rounded-md my-2 text-gray-300"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="price"
        className="bg-transparent p-3 w-96 border rounded-md my-2 text-gray-300"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="image url"
        className="bg-transparent p-3 w-96 border rounded-md my-2 mb-3 text-gray-300"
        value={newProduct.image}
        onChange={(e) =>
          setNewProduct({ ...newProduct, image: e.target.value })
        }
      />
      <Button
        variant="contained"
        className="w-96 h-11"
        onClick={handleNewProduct}
      >
        Submit
      </Button>

      {/* Snackbar untuk notifikasi */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Durasi munculnya Snackbar
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CreatePage
