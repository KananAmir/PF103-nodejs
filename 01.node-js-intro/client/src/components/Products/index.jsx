import { useEffect, useState, useRef } from "react"
import { BASE_URL } from "../../constants"
import axios from "axios"

const Products = () => {
  const [products, setProducts] = useState(null)

  const timeoutRef = useRef(null)
  
  const getProducts = async () => {
    try {
      const response = await axios(`${BASE_URL}/products`)
      setProducts(response.data.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?")
    if (!confirm) return
    try {
      const response = await axios.delete(`${BASE_URL}/products/${id}`)
      if (response.status === 200) {
        setProducts(products.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  const handleSearch = (e) => {
    clearTimeout(timeoutRef.current)
    const searchValue = e.target.value
    try {
      timeoutRef.current = setTimeout(async () => {
        const response = await axios(`${BASE_URL}/products?search=${searchValue}`)
        setProducts(response.data.data)
      }, 500)

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (!products) return <div className="text-center text-gray-600 mt-10">Loading...</div>

  // if (products.length === 0) return <div className="text-center text-gray-600 mt-10">No products found</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        🛍️ Product List
      </h1>

      <div>
        <input type="search" className="my-3 border-3 border-amber-950"
          onChange={handleSearch}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length === 0 && <div className="text-center text-gray-600 mt-10">No products found</div>}
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition duration-300"
          >
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{p.title}</h2>
            <p className="text-gray-500 text-sm mb-3">{p.category}</p>
            <p className="text-green-600 font-bold text-lg mb-4">${p.price}</p>

            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
