
import {create} from "zustand"

export const useProductStore = create((set) => ({
    products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	getData: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
    deleteProduct : async (id)=> {
        const res = await fetch(`api/products/${id}`,{
            method: "DELETE"
        })
        const data = await res.json()
        if(!data.success) return {success: false, message: data.message}

        set(state => ({products: state.products.filter(products => products._id !== id)}))
        return {success: true, message: data.message}
    },
	updateProduct : async (id, updatedData) => {
		const response = await fetch(`/api/products/${id}`, {
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		});
		const data = await response.json();
		if(!data.success) return {success: false, message: data.message}
		set(state => ({products: state.products.map((product) => (product._id === id? data.data : product)),	
		}))
		return {success: true, message: "Product updated successfully"}
	}
}))