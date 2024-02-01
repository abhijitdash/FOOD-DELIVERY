import React, { useEffect, useRef, useState } from "react";
import {useDispatchCart, useCart} from './ContextReducer'

export default function Card(props) {
  
  let dispatch = useDispatchCart()
  let options=props.options
  let priceoptions = Object.keys(options)
  const [qty,setQty]= useState(1)
  const [size, setSize] = useState("")
  let data = useCart()
  const priceRef = useRef()

  const handleAddToCart = async ()=>{
    let food =[]
    for (const item of data){
      if(item.id === props.foodItem._id){
        food=item

        break;
      }
    }
    if(food != []){
      if(food.size === size){
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
        return
      }
      else if (food.size !== size){
        await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
        return 
      }
      return 
    } 
    await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
  }
  let finalPrice = qty*parseInt(options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div>
        <div class="card mt-3" style={{ width: "18rem;", maxHeight: "360px" }}>
          <img src={props.foodItem.img} class="card-img-top" style={{maxHeight: "120px", objectFit: "contain !important"}} alt="..."></img>
          <div class="card-body">
            <h5 class="card-title">{props.foodItem.name}</h5>
            <div class="container w-100">
              <select class="m-2 h-100 bg-success rounded"  onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select class="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {priceoptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>

              <div className="d-inline h-100 fs-5">{finalPrice}/-</div>
            </div>
            <hr></hr>
              <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      
    </div>
  );
}
