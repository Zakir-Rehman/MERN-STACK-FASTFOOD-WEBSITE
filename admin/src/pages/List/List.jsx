import React, { useEffect, useState } from "react";
import "./List.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";

function List({ url }) {
  // ===== STATES =====
  const [list, setList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  // ===== FETCH LIST =====
  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      }
    } catch (err) {
      toast.error("Loading for server respond");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // ===== DELETE =====
  const removeFood = async (id) => {
    await axios.post(`${url}/api/food/remove`, { id });
    toast.success("Item deleted");
    fetchList();
  };

  // ===== EDIT CLICK =====
  const handleEditClick = (item) => {
    setEditId(item._id);
    setOldImage(item.image);
    setData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
    setImage(null);
    setShowEdit(true);
  };

  // ===== INPUT CHANGE =====
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ===== UPDATE SUBMIT =====
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      id: editId,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category
    };

    const res = await axios.patch(`${url}/api/food/edit`, payload);

    if (res.data.success) {
      toast.success("Food updated");
      setShowEdit(false);
      fetchList();
    } else {
      toast.error("Update failed");
    }
  };


  // ===== JSX =====
  return (
    <div className=" list-cont">
      <h2>All Foods List</h2>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list && list.length ? list.map((item) => (
          <div className="list-table-format" key={item._id}>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div className="action-div">
              <button onClick={() => removeFood(item._id)} className="btn-delete">
                Delete
              </button>
              <button
                onClick={() => handleEditClick(item)}
                className="btn-edit"
              >
                Edit
              </button>
            </div>
          </div>
        )) :
          // <div class="loader-container">
          //   <div class="loader">
          //     <div></div>
          //     <div></div>
          //     <div></div>
          //     <div></div>
          //   </div>
          // </div>
          <div className="loader-container">
            <div class="loader"></div>
          </div>


        }
      </div>

      {/* ===== EDIT POPUP ===== */}
      {showEdit && (
        <>
          <div className="edit-overlay" onClick={() => setShowEdit(false)}></div>

          <div className="edit-popup" >
            <div className="top-div">
              <h2>Edit Food</h2>
              <p onClick={() => setShowEdit(false)}>
                <IoIosCloseCircleOutline />
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="edit-form flex-col">
              <label htmlFor="image">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `${url}/images/${oldImage}`
                  }
                  alt=""
                />
              </label>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />

              <input
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Name"
              />

              <textarea
                name="description"
                value={data.description}
                onChange={onChangeHandler}
                placeholder="Description"
              />
              <div className="select-price-div">
                <select
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                  className="edit-select custom-edit"
                >
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Sandwich">Sandwich</option>
                </select>

                <input
                  type="number"
                  name="price"
                  className="edit-price custom-edit"
                  value={data.price}
                  onChange={onChangeHandler}
                  placeholder="Price"
                />
              </div>
              <button className="add-btn update-btn">UPDATE</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default List;
