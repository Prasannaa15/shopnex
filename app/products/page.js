"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function Products() {
  const dispatch = useDispatch();
  const products = [
    { id: 1, name: "Laptop", price: 60000 },
    { id: 2, name: "Headphones", price: 2500 },
    { id: 3, name: "Smartwatch", price: 5000 },
  ];

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Products</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button
              onClick={() => dispatch(addToCart(p))}
              style={{ backgroundColor: "#3dffef", border: "none", padding: "8px 15px", borderRadius: "5px" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
