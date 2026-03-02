

const ProductCard = ({ product }) => {
  return (
    <div class="w-60 max-md:w-40 h-85 max-md:h-70 bg-gray-50 p-3 flex flex-col items-center gap-1 rounded-2xl m-2 border border-grey-500">
      <img
        src={product.image}
        alt="product" 
        class="h-48 w-48 rounded-xl" 
      />
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-row justify-between w-full">
          <div class="flex flex-col w-full">
            <span class="text-xl font-bold">{product.name}</span>
            <span class="font-bold text-green-600">$: {product.price}</span>
          </div>
        </div>
        <button class="text-gray-50 bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] py-2 rounded-md cursor-pointer">Add to cart</button>

      </div>
    </div>
  )
}

export default ProductCard
