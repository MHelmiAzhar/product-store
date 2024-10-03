import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import AddBoxIcon from '@mui/icons-material/AddBox'

const Navbar = () => {
  return (
    <div className="flex justify-between px-8 py-3 w-full items-center">
      <p className="font-bold text-gray-300 text-2xl">
        {/* Add Link to 'Product Store' */}
        <Link to="/" className="flex items-center">
          Product Store <LocalGroceryStoreIcon />
        </Link>
      </p>
      {/* Add Link to Button */}
      <Link to="/create">
        <Button>
          <AddBoxIcon fontSize="large" sx={{ color: '#e0e0e0' }} />
        </Button>
      </Link>
    </div>
  )
}

export default Navbar
