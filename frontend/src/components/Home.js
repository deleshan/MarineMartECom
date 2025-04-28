import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const currentPage = localStorage.getItem("PageNumber")
    ? localStorage.getItem("PageNumber")
    : 1;
  localStorage.setItem("PageNumber", currentPage);

  const [page, setPage] = useState(currentPage);
  const setCurrentPageNo = (pageNo) => {
    setPage(pageNo);
  };
  localStorage.setItem("PageNumber", page);
  localStorage.removeItem("pageNumber");

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    dispatch(getProducts(null, null, null, null, page));
  }, [error, dispatch, page]);

  return (
    <Fragment>
      <section class="hero">
            <h1>Welcome to MarineMart</h1>
            <p>Shop everything from electronics to fashion, home essentials, and more</p>
            
      </section>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"New Products"} />

          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={8} key={product._id} product={product} />
                ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={page}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
