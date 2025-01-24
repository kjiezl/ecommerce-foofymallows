import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice"
import { 
    setCategories,
    setProducts,
    setChecked
} from "../redux/features/shop/shopSlice"
import Loader from "../components/Loader"
import ProductCard from "./Products/ProductCard"

const Shop = () => {
    const dispatch = useDispatch()
    const {categories, products, checked, radio} = useSelector((state) => state.shop);

    const categoriesQuery = useFetchCategoriesQuery()
    const [priceFilter, setPriceFilter] = useState('');

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    })

    useEffect(() => {
        if(!categoriesQuery.isLoading){
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch])

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading) {
                // Filter products based on both checked categories and price filter
                const filteredProducts = filteredProductsQuery.data.filter(
                (product) => {
                    // Check if the product price includes the entered price filter value
                    return (
                    product.price.toString().includes(priceFilter) ||
                    product.price === parseInt(priceFilter, 10)
                    );
                }
                );
        
                dispatch(setProducts(filteredProducts));
            }
        }
      }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);
    
    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter(
          (product) => product.brand === brand
        );
        dispatch(setProducts(productsByBrand));
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value
            ? [...checked, id]
            : checked.filter((c) => c !== id);
        dispatch(setChecked(updatedChecked));

    };

    const uniqueBrands = [
        ...Array.from(
          new Set(
            filteredProductsQuery.data
              ?.map((product) => product.brand)
              .filter((brand) => brand !== undefined)
          )
        ),
    ];

    const handlePriceChange = e => {
        setPriceFilter(e.target.value);
    }

  return (
    <>
        <div className="mt-4 ml-[7rem]">
            <a href="/" className="text-3xl font-semibold text-pink-600 font-varela ">Foofy<span className="text-pink-400">mallows</span></a><br />
        </div>
        <div className="container mx-auto mt-6">
            <div className="flex md:flex-row">
                <div className="bg-pink-100 p-3 mt-2 mb-2 rounded">
                    <h2 className="h4 text-center py-2 bg-pink-200 rounded-full mb-2">
                        Filter by Categories
                    </h2>
                    <div className="p-5 w-[15rem]">
                        {categories?.map((c) => (
                            <div key={c._id} className="mb-2">
                                <div className="flex items-center mr-4">
                                    <input 
                                        type="checkbox" 
                                        id='red-checkbox' 
                                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                                        className="w-4 h-4 text-pink-600 bg-gray-200 border-gray-400 rounded focus:ring-pink-500 focus:ring-0 hover:cursor-pointer hover:scale-110 transition-transform" />

                                        <label htmlFor="pink-checkbox" className="ml-2 text-sm font-medium text-slate-700">
                                            {c.name}
                                        </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="h4 text-center py-2 bg-pink-200 rounded-full mb-2">
                        Filter by Brands
                    </h2>
                    <div className="p-5">
                        {uniqueBrands?.map((brand) => (
                            <>
                                <div className="flex items-center mr-4 mb-5">
                                    <input
                                        type='radio'
                                        id={brand}
                                        name="brand"
                                        onChange={() => handleBrandClick(brand)} 
                                        className="w-4 h-4 text-pink-500 bg-gray-200 border-gray-400 focus:ring-pink-500 focus:ring-0 hover:scale-110 hover:cursor-pointer transition-transform"
                                        />
                                    <label htmlFor="pink-radio" className="ml-2 text-sm font-medium text-slate-700">
                                        {brand}
                                    </label>
                                </div>
                            </>
                        ))}
                    </div>
                    <h2 className="h4 text-center py-2 bg-pink-200 rounded-full mb-2">
                        Filter by Price
                    </h2>
                    <div className="p-5 w-[15rem]">
                        <input 
                            type="text"
                            placeholder="00.00"
                            value={priceFilter}
                            onChange={handlePriceChange}
                            className="w-full px-3 py-2 placeholder-slate-400 border rounded-lg focus:outline-none focus:ring-1 focus:border-pink-400" 
                            />
                    </div>  
                    <div className="p-5 pt-0">
                        <button 
                            className="w-full border my-4 bg-pink-600 py-2 px-4 rounded-lg text-white hover:cursor-pointer hover:scale-105 hover:brightness-125 transition-all" 
                            onClick={() => window.location.reload()}>
                                Reset
                        </button>
                    </div>
                </div>
                <div className="p-3">
                    <h2 
                        className="h4 text-center mb-6 font-bold font-varela text-lg">
                            {products?.length} Products
                    </h2>
                    <div className="flex flex-wrap">
                        {products.length === 0 ? (
                            <Loader />
                        ) : (
                            products?.map((p) => (
                                <div className="p-3" key={p._id}>
                                    <ProductCard p={p}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Shop