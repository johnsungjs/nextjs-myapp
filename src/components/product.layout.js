function ProductLayout(props){
  return(
    <div className="w-full">
      <div className="w-full bg-white h-20 border-b">
        <p>Product Layout</p>
      </div>

      <div className="w-full bg-gray-200">
        {props?.children}
      </div>
    </div>
  )
}

export default ProductLayout;