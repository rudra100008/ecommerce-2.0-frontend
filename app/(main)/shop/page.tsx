"use client"

import { useState } from "react"
import { useProducts } from './../../../hooks/useProducts';
import Navbar from "@/components/common/CustomerNav";


export default function ShopPage(){
    const [page,setPage] = useState(0);
    const {data,isLoading,isError,error} = useProducts(page);

    if(isLoading){
        return <div>Loading products....</div>
    }

    if(isError){
        return <div>Error: {error?.message}</div>
    }
    return(
        <div className="products-grid">
            <Navbar />
            {data?.content.map((product)=>(
                <div key={product.productId}>
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    )
}