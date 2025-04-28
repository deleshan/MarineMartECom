import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, createNewProduct, updateProduct } from "../../actions/productActions";
import {
  clearProductCreated,
  clearError,
} from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading,
    isProductCreated,
    isProductUpdated,
    error,
    productDetails,
  } = useSelector((state) => state.productState);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "computer",
    "Accessories",
    "Headphones",
    "Food",
    "book",
    "clothes/shoes",
    "Beauty/Health",
    "Outdoor",
    "Home",
    "Sports",
  ];

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });

    if (productId) {
      dispatch(updateProduct(productId, formData));
    } else {
      dispatch(createNewProduct(formData));
    }
  };

  useEffect(() => {
    if (productId && (!productDetails || productDetails._id !== productId)) {
      dispatch(getProduct(productId));
    } else if (productId && productDetails) {
      setName(productDetails.name);
      setPrice(productDetails.price);
      setDescription(productDetails.description);
      setCategory(productDetails.category);
      setStock(productDetails.stock);
      setSeller(productDetails.seller);
      setImagesPreview(productDetails.images.map((img) => img.image));
    }

    if (isProductCreated) {
      toast.success("Product Created Successfully!");
      dispatch(clearProductCreated());
      navigate("/shop/shopdashboard/products");
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [
    dispatch,
    error,
    isProductCreated,
    isProductUpdated,
    navigate,
    productId,
    productDetails,
  ]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form
              onSubmit={submitHandler}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">{productId ? "Edit Product" : "New Product"}</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                  value={category}
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                />
              </div>

              <div className="form-group">
                <label>Images</label>
                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {imagesPreview.map((img, i) => (
                  <img
                    className="mt-3 mr-2"
                    key={i}
                    src={img}
                    alt={"Preview"}
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                {productId ? "UPDATE" : "CREATE"}
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
