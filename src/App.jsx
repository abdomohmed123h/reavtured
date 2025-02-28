import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import "./App.css";

function App() {
  const [phone, setPhone] = useState([
    { name: "iPhone X", price: 1000, qty: 10 },
    { name: "Tablet", price: 500, qty: 5 },
    { name: "Laptop", price: 2000, qty: 3 },
    { name: "Smartwatch", price: 150, qty: 20 },
    { name: "Headphones", price: 50},
    { name: "Speakers", price: 250, qty: 12 },
    { name: "Camera", price: 1200, qty: 8 },
    { name: "Charger", price: 100, qty: 25 },
    { name: "Mouse", price: 50, qty: 18 },
    { name: "Keyboard", price: 100, qty: 25 },
    { name: "Monitor", price: 2500, qty: 7 },
    { name: "Mousepad", price: 30, qty: 22 },
    { name: "Gamepad", price: 80, qty: 10 },
    { name: "Powerbank", price: 50, qty: 13 },
    { name: "Earbuds", price: 30, qty: 17 }
  ]);

  const [modelindex, setmodelindex] = useState(false);
  const [modelindextoedite, setmodelindextoedite] = useState(false);
  const [phoneName, setPhoneName] = useState("");
  const [phonePrice, setPhonePrice] = useState(0);
  const [phoneQuantity, setPhoneQuantity] = useState(0);
  const [phoneToEdit, setPhoneToEdit] = useState(null);

  const handelsument = (event) => {
    event.preventDefault();
    setPhone([...phone, { name: phoneName, price: +phonePrice, qty: +phoneQuantity }]);
    Swal.fire({
      icon: "success",
      title: "Phone added successfully",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      setmodelindex(false);
      resetForm();
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
        copy.splice(index, 1);
        setPhone(copy);
        Swal.fire("Deleted!", "Your phone has been deleted.", "success");
      }
    });
  };

  const handelsumentedited = (event) => {
    event.preventDefault();
    let copy = [...phone];
    copy[phoneToEdit] = { name: phoneName, price: +phonePrice, qty: +phoneQuantity };
    setPhone(copy);
    Swal.fire({
      icon: "success",
      title: "Phone updated successfully",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      setmodelindextoedite(false);
      resetForm();
    });
  };

  const openphonetoediite = (index) => {
    setPhoneToEdit(index);
    setPhoneName(phone[index].name);
    setPhonePrice(phone[index].price);
    setPhoneQuantity(phone[index].qty);
    setmodelindextoedite(true);
  };

  const resetForm = () => {
    setPhoneName("");
    setPhonePrice(0);
    setPhoneQuantity(0);
  };

  return (
    <>
      <h1 className="text-center">Hello, world! </h1>
      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary p-3" onClick={() => setmodelindex(true)}>
          <IoIosAddCircle className="fs-3 m-1" /> Add new phone
        </button>
      </div>
      <div className="container-lg mt-4 d-flex flex-wrap gap-3">
        {phone.map((item, index) => (
          <div key={index} className="mb-2">
            <button className="btn btn-primary shadow-sm p-2">
              {`${item.name} - $${item.price}`}
              <IoRemoveCircleOutline className="text-danger ms-2" onClick={() => removePhone(index)} />
              <LiaEdit className="ms-2 fs-4 text-secondary" onClick={() => openphonetoediite(index)} />
            </button>
          </div>
        ))}
      </div>

      {modelindextoedite && (
        <div className="addmodel" onClick={() => setmodelindextoedite(false)}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <form onClick={(e) => e.stopPropagation()} onSubmit={handelsumentedited}
              className="bg-white rounded col-12 col-md-6 p-4 shadow">
              <h1 className="text-center">
                Edit Phone{" "}
                <FaWindowClose className="ms-3" onClick={() => setmodelindextoedite(false)} />
              </h1>
              <input type="text" className="form-control mb-3" placeholder="Enter phone name"
                value={phoneName} onChange={(e) => setPhoneName(e.target.value)} />
              <input type="number" className="form-control mb-3" placeholder="Enter phone price"
                value={phonePrice} onChange={(e) => setPhonePrice(e.target.value)} />
              <input type="number" className="form-control mb-3" placeholder="Enter phone quantity"
                value={phoneQuantity} onChange={(e) => setPhoneQuantity(e.target.value)} />
              <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
          </div>
        </div>
      )}

      {modelindex && (
        <div className="addmodel" onClick={() => setmodelindex(false)}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <form onClick={(e) => e.stopPropagation()} onSubmit={handelsument}
              className="bg-white rounded col-12 col-md-6 p-4 shadow">
              <h1 className="text-center">
                Add New Phone{" "}
                <FaWindowClose className="ms-3" onClick={() => setmodelindex(false)} />
              </h1>
              <input type="text" className="form-control mb-3" placeholder="Enter phone name"
                value={phoneName} onChange={(e) => setPhoneName(e.target.value)} />
              <input type="number" className="form-control mb-3" placeholder="Enter phone price"
                value={phonePrice} onChange={(e) => setPhonePrice(e.target.value)} />
              <input type="number" className="form-control mb-3" placeholder="Enter phone quantity"
                value={phoneQuantity} onChange={(e) => setPhoneQuantity(e.target.value)} />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
