import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { useProductStore } from '../store/product'
import { useSnackbar } from '../context/snackBarContext.jsx'

const Card = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore()
  const showSnackbar = useSnackbar()

  const [open, setOpen] = useState(false) // State untuk membuka/tutup modal
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  })

  // Fungsi untuk membuka modal
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Fungsi untuk menutup modal
  const handleClose = () => {
    setOpen(false)
  }

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUpdatedProduct({ ...updatedProduct, [name]: value })
  }

  // Fungsi untuk memperbarui produk
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    )
    showSnackbar(message, success ? 'success' : 'error')
    handleClose()
  }

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id)
    showSnackbar(message, success ? 'success' : 'error')
  }

  return (
    <div className="border flex justify-center flex-col rounded-lg shadow-lg overflow-hidden bg-white transform transition-all hover:-translate-y-1">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-gray-800 font-semibold text-xl">{product.name}</p>
        <p className="text-gray-500 py-2">Rp. {product.price}</p>
      </div>
      <div className="flex justify-around p-2">
        <Button
          variant="contained"
          className="w-full m-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          onClick={handleClickOpen} // Buka modal saat klik Edit
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          className="w-full m-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          onClick={() => handleDeleteProduct(product._id)}
        >
          Delete
        </Button>
      </div>

      {/* Modal untuk update produk */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            name="name"
            fullWidth
            value={updatedProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={updatedProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="image"
            name="price"
            fullWidth
            value={updatedProduct.image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Card
