import { useState } from "react";
import { IoIosAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import "./App.css";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";

function App() {
  const [phone, setPhone] = useState([
    { name: "iPhone X", price: 1000, qty: 10 },
    { name: "Tablet", price: 500, qty: 5 },
    { name: "Laptop", price: 2000, qty: 3 },
    { name: "Smartwatch", price: 150, qty: 20 },
    { name: "Headset", price: 70, qty: 15 },
    { name: "Speakers", price: 250, qty: 12 },
    { name: "Camera", price: 1200, qty: 8 },
    { name: "Mouse", price: 50, qty: 18 },
    { name: "Keyboard", price: 100, qty: 25 },
    { name: "Monitor", price: 2500, qty: 7 },
    { name: "Mousepad", price: 30, qty: 22 },
    { name: "Gamepad", price: 80, qty: 10 },
    { name: "Charger", price: 100, qty: 5 },
    { name: "Powerbank", price: 50, qty: 13 },
    { name: "Earbuds", price: 30, qty: 17 }
  ]);
  const [modelindex, setmodelindex] = useState(false);
  const [phoneName, setPhoneName] = useState("");
  const [phonePrice, setPhonePrice] = useState(0);
  const [phoneQuantity, setPhoneQuantity] = useState(0);
  const handelsument = () => {
    event.preventDefault();
    setPhone([
      ...phone,
      { name: phoneName, price: +phonePrice, qty: +phoneQuantity }
    ]);
    Swal.fire({
      icon: "success",
      title: "Phone added successfully",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      setmodelindex(!modelindex);
    });
  };
  const removePhone = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let copy = [...phone];
        copy.splice(index, 1); // حذف عنصر واحد عند الفهرس المحدد
        setPhone(copy);
  
        // إظهار رسالة تأكيد بعد الحذف
        Swal.fire("Deleted!", "Your phone has been deleted.", "success");
      }
    });
  };
  const setphonetoedite = (index) => {
    let phone =phone[index];
    setPhoneName(phone.name);
    setPhonePrice(phone.price);
    setPhoneQuantity(phone.qty);
    
  }
  return (
    <>
      <h1 className="text-center">Hello, world! </h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary p-3 "
          onClick={() => setmodelindex(!modelindex)}
        >
          <IoIosAddCircle className="fs-3 m-1" /> Add new phone
        </button>
      </div>
      <div className="container-lg container-fluid mt-4 mt-4 d-flex flex-wrap gap-3">
        {phone.map((item, index) => (
          <div key={index} className="mb-2  ">
            <button className="btn btn-primary shadow-sm p-2">
              {`${item.name} - $${item.price} `}
              <IoRemoveCircleOutline
                className="text-bg-danger "
                onClick={() => {
                  removePhone(index);
                }}
                
              />
              <LiaEdit className=" ms-2 fs-4  text-secondary"
                 onClick={()=>{
                  setphonetoedite(index);

                 }} />
            </button>
          </div>
        ))}
      </div>
      {modelindex == true ? (
        <div className="addmodel " onClick={() => setmodelindex(!modelindex)}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handelsument}
              className="bg-white rounded col-12 col-md-6 d-flex flex-column p-4 animate__animated animate__fadeInDown shadow"
            >
              <h1 className="text-center mt-2 mb-4">
                Add new phone{" "}
                <FaWindowClose
                  className="ms-3"
                  onClick={() => setmodelindex(!modelindex)}
                />
              </h1>
              <input
              defaultValue={phoneName}
                type="text"
                className="form-control mb-3"
                placeholder="Enter phone name"
                onKeyUp={(event) => {
                  setPhoneName(event.target.value);
                }}
              />
              <input
              defaultValue={phonePrice}
                type="number"
                className="form-control mb-3"
                placeholder="Enter phone price"
                onKeyUp={(event) => {
                  setPhonePrice(event.target.value);
                }}
              />
              <input
              defaultValue={phoneQuantity}
                type="number"
                className="form-control mb-3"
                placeholder="Enter phone quantity"
                onKeyUp={(event) => {
                  setPhoneQuantity(event.target.value);
                }}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
