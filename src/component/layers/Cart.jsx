import React, { useEffect, useState, useContext } from 'react'
import Container from '../layers/Container'
import Breadcumb from '../layers/Breadcumb'
import Down from '../../../public/down.png';
import Close from '../../../public/close.png'
import { useNavigate, useParams } from 'react-router-dom';
import { Contex } from '../../context/Quantity'


const Cart = () => {
    let nevigate = useNavigate();
    let { id } = useParams();
    let [opens, setOpens] = useState(false)
    let [product, setProduct] = useState([])
    let { quantity, setQuantity, price, setPrice, setSize, size } = useContext(Contex);
    setPrice(product.price * quantity)

    useEffect(() => {
        let getdata = async () => {
            let response = await fetch("https://dummyjson.com/products");
            let data = await response.json();
            let newdata = await data.products;
            let uniqueProduct = newdata.find((data) => {
                return data.id == id
            })
            setProduct(uniqueProduct);
        }
        getdata();

    }, [])

    let handlerDecrement = () => {
        setQuantity(quantity + 1);
    }
    let handlerIncrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    let handlersize = () => {
        setOpens(!opens);
    }
    return (
        <>
            <Container>
                <Breadcumb status='hidden' className='my-[124px]' three='hidden' />
                <div className="mb-5">
                    <div className="bg-[#f5f5f3] py-8 grid grid-cols-12 content-center">
                        <h3 className='col-span-3 pl-5 font-bold text-base leading-[144%] text-[#262626] font-dm'>Product</h3>
                        <h3 className='col-span-3 font-bold text-base leading-[144%] text-[#262626] font-dm'>Price</h3>
                        <h3 className='col-span-3 font-bold text-base leading-[144%] text-[#262626] font-dm'>Quantity</h3>
                        <h3 className='col-span-3 font-bold text-base leading-[144%] text-[#262626] font-dm'>Total</h3>
                    </div>


                    <div className="cart_inner">
                        <div className="py-8 border-[1px] border-[#F0F0F0] grid grid-cols-12 content-center items-center">
                            <div className="flex items-center col-span-3">
                                <img className='inline-block pl-5 pr-10' src={Close} alt="" />
                                <div className="w-24 h-24">
                                    <img className='w-full h-full object-cover' src={product.thumbnail} alt="" />
                                </div>
                                <h3 className='pl-5 font-bold text-base leading-[144%] text-[#262626] font-dm'>{product.title}..</h3>
                            </div>
                            <h2 className='col-span-3 font-bold text-xl text-[#262626] font-dm'>{product.price} $</h2>
                            <div className='col-span-3 border-[1px] border-[#f0f0f0] w-36 h-9 grid grid-cols-3 items-center'>
                                <button onClick={handlerIncrement} className='font-normal text-base leading-[187%] text-[#767676] font-dm'>-</button>
                                <h3 className='font-normal text-center text-base leading-[187%] text-[#767676] font-dm'>{quantity}</h3>
                                <button onClick={handlerDecrement} className='font-normal border-none text-base leading-[187%] text-[#767676] font-dm'>+</button>
                            </div>
                            <h2 className='col-span-3 font-bold text-xl text-[#262626] font-dm'>{price} $</h2>
                        </div>
                        <div className="flex justify-between items-center py-6 border-b border-r border-l border-[#F0F0F0] px-5">
                            <div className="flex items-center">
                                <button onClick={handlersize} className="flex focus:outline-none relative items-center justify-center border-[1px] border-[#f0f0f0] w-36 h-9 gap-x-[76px] px-5">
                                    <h3 className='font-normal text-base leading-[187%] text-[#767676] font-dm'>{size}</h3>
                                    <img src={Down} alt="" />
                                    <div className={`absolute bg-[#fff] top-full left-0 w-full ${opens ? "visible opacity-1" : "invisible opacity-0"}`}>
                                        <button onClick={(e) => { setSize(e.target.value) }} value='S' className='border hover:bg-teal-400 hover:border-teal-400 focus:outline-none py-1 w-full'>S</button>
                                        <button onClick={(e) => { setSize(e.target.value) }} value='M' className='border hover:bg-teal-400 hover:border-teal-400 focus:outline-none py-1 w-full'>M</button>
                                        <button onClick={(e) => { setSize(e.target.value) }} value='L' className='border hover:bg-teal-400 hover:border-teal-400 focus:outline-none py-1 w-full'>L</button>
                                        <button onClick={(e) => { setSize(e.target.value) }} value='XL' className='border hover:bg-teal-400 hover:border-teal-400 focus:outline-none py-1 w-full'>XL</button>
                                    </div>
                                </button>
                                <h3 className='font-bold text-sm text-[#262626] font-dm pl-6'>Apply coupon</h3>
                            </div>
                            <h3 className='font-bold text-sm text-right text-[#262626] font-dm capitalize'>Update cart</h3>
                        </div>
                    </div>

                    <div className="flex items-end flex-col">
                        <h3 className='font-bold text-xl text-[#262626] font-dm pt-[54px] pb-[24px] capitalize'>Cart totals</h3>
                        <div className="grid grid-cols-2 grid-rows-2 border-[2px] border-[#F0F0F0]">
                            <h3 className='pr-[234px] border-b-[2px] border-r-[2px] border-[#F0F0F0] pl-5 py-4 font-bold text-base leading-[144%] text-[#262626] font-dm'>Subtotal</h3>
                            <h3 className='pr-[234px] pl-5 py-4 border-b-[2px] border-[#F0F0F0] font-normal text-base leading-[187%] text-[#767676] font-dm'>{price} $</h3>
                            <h3 className='pr-[234px] pl-5 py-4 border-r-[2px] border-[#F0F0F0] font-bold text-base leading-[144%] text-[#262626] font-dm'>Total</h3>
                            <h3 className='pr-[234px] pl-5 py-4 font-normal text-base text-[#262626] font-dm'>{price} $</h3>
                        </div>
                        <div className="flex gap-x-5 items-center">
                            <button onClick={() => { nevigate("/shop") }} className='py-4 px-10 border-[1px] border-[#262626] text-[#262626] font-bold text-sm text-center hover:bg-[#262626] hover:text-[#fff] font-dm mt-8'>Back to Shop</button>
                            <button className='py-4 px-7 bg-[#262626] font-bold text-sm text-center text-[#fff] font-dm mt-8'>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart