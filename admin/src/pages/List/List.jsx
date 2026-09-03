// import React, { useEffect, useState } from "react";
// import "./List.css";
// import { assets } from "../../assets/admin_assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { LoaderLine } from "../../components/Loaders/LoadingLine";
// import { ActivityIndicator } from "../../components/Loaders/ActivityIndicator";
// function List({ url }) {
//   // ===== STATES ===== 
//   const [list, setList] = useState([]);
//   const [showEdit, setShowEdit] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [image, setImage] = useState(null);
//   const [oldImage, setOldImage] = useState("");
//   const [updateLoader, setUpdateLoader] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Salad",
//   });
//   const [search, setSearch] = useState("");
//   // ===== FETCH LIST =====
//   const fetchList = async () => {
//     try {
//       const res = await axios.get(`${url}/api/food/list`);
//       if (res.data.success) {
//         setList(res.data.data);
//       }
//     } catch (err) {
//       toast.error("Loading for server respond");
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   // ===== DELETE =====
//   const removeFood = async (id) => {
//     await axios.post(`${url}/api/food/remove`, { id });
//     toast.success("Item deleted");
//     fetchList();
//   };

//   // ===== EDIT CLICK =====
//   const handleEditClick = (item) => {
//     setEditId(item._id);
//     setOldImage(item.image);
//     setData({
//       name: item.name,
//       description: item.description,
//       price: item.price,
//       category: item.category,
//     });
//     setImage(null);
//     setShowEdit(true);
//   };

//   // ===== INPUT CHANGE =====
//   const onChangeHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   // ===== UPDATE SUBMIT =====
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     const payload = {
//       id: editId,
//       name: data.name,
//       description: data.description,
//       price: data.price,
//       category: data.category
//     };
//     setUpdateLoader(true)
//     const res = await axios.put(`${url}/api/food/edit`, payload);
//     setUpdateLoader(false)
//     if (res.data.success) {
//       toast.success("Food updated");
//       setShowEdit(false);
//       fetchList();
//     } else {
//       toast.error("Update failed");
//     }
//   };
//   const filteredList = list.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase()) ||
//     item.category.toLowerCase().includes(search.toLowerCase()) ||
//     item.price.toString().includes(search)
//   );

//   // ===== JSX =====
//   return (
//     <div className=" list-cont">
//       <h2>All Foods List</h2>

//       <input
//         type="search"
//         className="list-search"
//         placeholder="Search by name, category or price..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />

//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {filteredList && filteredList.length ? filteredList.map((item) => (
//           <div className="list-table-format" key={item._id}>
//             <img src={`${url}/images/${item.image}`} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>${item.price}</p>
//             <div className="action-div">
//               <button onClick={() => removeFood(item._id)} className="btn-delete">
//                 Delete
//               </button>
//               <button
//                 onClick={() => handleEditClick(item)}
//                 className="btn-edit"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         )) :
//           search ? (
//             <p className="no-result">No item found</p>
//           ) : (
//             // <div class="loader-container">
//             //   <div class="loader">
//             //     <div></div>
//             //     <div></div>
//             //     <div></div>
//             //     <div></div>
//             //   </div>
//             // </div>
//             <div className="loader-container">
//               <div class="loader"></div>
//             </div>
//           )

//         }
//       </div>

//       {/* ===== EDIT POPUP ===== */}
//       {showEdit && (
//         <>
//           <div className="edit-overlay" onClick={() => setShowEdit(false)}></div>

//           <div className="edit-popup" >
//             <div className="top-div">
//               <h2>Edit Food</h2>
//               <p onClick={() => setShowEdit(false)}>
//                 <IoIosCloseCircleOutline />
//               </p>
//             </div>

//             <form onSubmit={onSubmitHandler} className="edit-form flex-col">
//               <label htmlFor="image">
//                 <img
//                   src={
//                     image
//                       ? URL.createObjectURL(image)
//                       : `${url}/images/${oldImage}`
//                   }
//                   alt=""
//                 />
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 hidden
//                 onChange={(e) => setImage(e.target.files[0])}
//               />

//               <input
//                 name="name"
//                 value={data.name}
//                 onChange={onChangeHandler}
//                 placeholder="Name"
//               />

//               <textarea
//                 name="description"
//                 value={data.description}
//                 onChange={onChangeHandler}
//                 placeholder="Description"
//               />
//               <div className="select-price-div">
//                 <select
//                   name="category"
//                   value={data.category}
//                   onChange={onChangeHandler}
//                   className="edit-select custom-edit"
//                 >
//                   <option value="Salad">Salad</option>
//                   <option value="Rolls">Rolls</option>
//                   <option value="Deserts">Deserts</option>
//                   <option value="Cake">Cake</option>
//                   <option value="Pure Veg">Pure Veg</option>
//                   <option value="Pasta">Pasta</option>
//                   <option value="Noodles">Noodles</option>
//                   <option value="Sandwich">Sandwich</option>
//                 </select>

//                 <input
//                   type="number"
//                   name="price"
//                   className="edit-price custom-edit"
//                   value={data.price}
//                   onChange={onChangeHandler}
//                   placeholder="Price"
//                 />
//               </div>
//               {/* {!updateLoader ?  <ActivityIndicator /> : */}
//               <button className="add-btn update-btn">
//                 {updateLoader ? <ActivityIndicator color="#FF4C24" borderColor="#fff" /> : "UPDATE"}
//                 {/* UPDATE */}
//               </button>
//               {/* } */}
//             </form>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default List;

import React, { useEffect, useState, useMemo } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiSearch, FiEye, FiEdit2, FiCopy, FiTrash2, FiPlus, FiXCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { LoaderLine } from "../../components/Loaders/LoadingLine";
import { ActivityIndicator } from "../../components/Loaders/ActivityIndicator";
import { createPortal } from "react-dom";
function List({ url }) {
  // ===== STATES =====
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [updateLoader, setUpdateLoader] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showView, setShowView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // ===== FETCH LIST =====
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      }
    } catch (err) {
      toast.error("Loading for server respond");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // ===== DELETE =====
  const removeFood = async (id) => {
    await axios.post(`${url}/api/food/remove`, { id });
    toast.success("Item deleted");
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    fetchList();
  };

  // ===== DUPLICATE (backend route abhi nahi hai) =====
  const duplicateFood = () => {
    toast.info("Duplicate feature ke liye backend route add karna hoga (/api/food/duplicate)");
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
      category: data.category,
    };
    setUpdateLoader(true);
    const res = await axios.put(`${url}/api/food/edit`, payload);
    setUpdateLoader(false);
    if (res.data.success) {
      toast.success("Food updated");
      setShowEdit(false);
      fetchList();
    } else {
      toast.error("Update failed");
    }
  };

  // ===== SELECT / CHECKBOX =====
  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? filteredList.map((i) => i._id) : []);
  };
  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // ===== helpers for fields backend abhi nahi bhejta =====
  const getCode = (id) => `FJ-${id.slice(-4).toUpperCase()}`;
  const getAvailability = (item) =>
    item.available === undefined ? null : item.available;

  // ===== CATEGORIES for filter dropdown (real data se) =====
  const categories = useMemo(() => {
    const unique = [...new Set(list.map((i) => i.category))];
    return ["All", ...unique];
  }, [list]);

  // ===== FILTER + SORT =====
  const filteredList = useMemo(() => {
    let result = list.filter(
      (item) =>
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.price.toString().includes(search)) &&
        (categoryFilter === "All" || item.category === categoryFilter)
    );

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return result;
  }, [list, search, categoryFilter, sortBy]);

  const allSelected =
    filteredList.length > 0 && selectedIds.length === filteredList.length;

  // ===== JSX =====
  return (
    <div className="list-cont">
      {/* ===== HEADER ===== */}
      <div className="list-header">
        <div>
          <h2>Food List</h2>
          <p className="list-subtitle">{list.length} items on your menu</p>
        </div>
        <Link to="/add" className="add-item-btn">
          <FiPlus /> Add Item
        </Link>
      </div>

      {/* ===== TOOLBAR ===== */}
      <div className="list-toolbar">
        <div className="list-search-wrap">
          <FiSearch className="list-search-icon" />
          <input
            type="search"
            className="list-search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="list-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="list-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <div className="list-table">
        <div className="list-table-format title">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => toggleSelectAll(e.target.checked)}
          />
          <b>Item</b>
          <b>Category</b>
          <b>Price</b>
          <b>Availability</b>
          <b>Orders</b>
          <b>Rating</b>
          <b>Actions</b>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : filteredList.length ? (
          filteredList.map((item) => {
            const availability = getAvailability(item);
            return (
              <div className="list-table-format" key={item._id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item._id)}
                  onChange={() => toggleSelectOne(item._id)}
                />

                <div className="item-cell">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <div className="item-cell-text">
                    <p className="item-name">{item.name}</p>
                    <span className="item-meta">
                      {getCode(item._id)}
                      {item.prepTime ? ` · ${item.prepTime} min prep` : ""}
                    </span>
                  </div>
                </div>

                <p>{item.category}</p>
                <p>Rs {item.price}</p>

                <p>
                  {availability === null ? (
                    <span className="badge badge-neutral">—</span>
                  ) : availability ? (
                    <span className="badge badge-available">● Available</span>
                  ) : (
                    <span className="badge badge-unavailable">● Unavailable</span>
                  )}
                </p>

                <p>{item.orderCount ?? "—"}</p>

                <p>
                  {item.rating ? (
                    <span className="rating"><FaStar /> {item.rating}</span>
                  ) : (
                    "—"
                  )}
                </p>

                <div className="action-div">
                  {/* <button className="icon-action" title="View" onClick={() => toast.info(item.description || "No description")}>
                    <FiEye />
                  </button> */}
                  <button
                    className="icon-action"
                    title="View"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowView(true);
                    }}
                  >
                    <FiEye />
                  </button>
                  <button className="icon-action" title="Edit" onClick={() => handleEditClick(item)}>
                    <FiEdit2 />
                  </button>
                  {/* <button className="icon-action" title="Duplicate" onClick={duplicateFood}>
                    <FiCopy />
                  </button> */}
                  <button className="icon-action danger" title="Delete" onClick={() => removeFood(item._id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-result">No item found</p>
        )}
      </div>

      {/* ===== EDIT POPUP ===== */}
      {/* {showEdit && (
        <>
          <div className="edit-overlay" onClick={() => setShowEdit(false)}></div>
          <div className="edit-popup">
            <div className="top-div">
              <h2>Edit Food</h2>
              <p onClick={() => setShowEdit(false)}>
                <IoIosCloseCircleOutline />
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="edit-form flex-col">
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : `${url}/images/${oldImage}`}
                  alt=""
                />
              </label>
              <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />

              <input name="name" value={data.name} onChange={onChangeHandler} placeholder="Name" />

              <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Description" />

              <div className="select-price-div">
                <select name="category" value={data.category} onChange={onChangeHandler} className="edit-select custom-edit">
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

              <button className="add-btn update-btn">
                {updateLoader ? <ActivityIndicator color="#FF4C24" borderColor="#fff" /> : "UPDATE"}
              </button>
            </form>
          </div>
        </>
      )} */}

      {/* ===== EDIT POPUP ===== */}
      {showEdit && createPortal(
        <>
          <div className="edit-overlay" onClick={() => setShowEdit(false)}></div>

          <div className="edit-popup">
            <div className="top-div">
              <h2>Edit Food</h2>
              <p onClick={() => setShowEdit(false)}>
                <IoIosCloseCircleOutline />
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="edit-form flex-col">
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : `${url}/images/${oldImage}`}
                  alt=""
                />
              </label>
              <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />

              <input name="name" value={data.name} onChange={onChangeHandler} placeholder="Name" />

              <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Description" />

              <div className="select-price-div">
                <select name="category" value={data.category} onChange={onChangeHandler} className="edit-select custom-edit">
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

              <button className="add-btn update-btn">
                {updateLoader ? <ActivityIndicator color="#FF4C24" borderColor="#fff" /> : "UPDATE"}
              </button>
            </form>
          </div>
        </>,
        document.body
      )}

      {showView &&
        selectedItem &&
        createPortal(
          <div className="modal-overlay" onClick={() => setShowView(false)}>
            <div className="edit-popup" onClick={(e) => e.stopPropagation()}>

              <div className="top-div">
                <h2>Food Details</h2>

                <p
                  // className="close-btn"
                  onClick={() => setShowView(false)}
                >
                  <IoIosCloseCircleOutline />
                </p>
              </div>
 

              <div className="popup-body">

                <img
                  src={`${url}/images/${selectedItem.image}`}
                  alt={selectedItem.name}
                  className="food-preview"
                />

                <div className="detail-group">
                  <label>Food Name</label>
                  <input
                    value={selectedItem.name}
                    readOnly
                  />
                </div>

                <div className="detail-group">
                  <label>Description</label>
                  <textarea
                    value={selectedItem.description}
                    readOnly
                  />
                </div>

                <div className="detail-row">

                  <div className="detail-group">
                    <label>Category</label>
                    <input
                      value={selectedItem.category}
                      readOnly
                    />
                  </div>

                  <div className="detail-group">
                    <label>Price</label>
                    <input
                      value={`Rs ${selectedItem.price}`}
                      readOnly
                    />
                  </div>

                </div>

              </div>

            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default List;