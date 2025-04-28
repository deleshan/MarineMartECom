import { Link } from "react-router-dom";

export default function Product({ product, col }) {
  return (
    <div className={`col-sm-12 col-md-3 col-sm-${col} `}>
      <div className="card p-3 rounded">
        <div className="card-img-container mx-auto">
          {product.images.length > 0 && (
            <img
              className="mx-auto"
              src={product.images[0].image}
              alt="1.jpg"
            />
          )}
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(product.ratings / 5) * 100}%`,
                }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <Link
            id="view_btn"
            className="btn btn-block"
            to={`/product/${product._id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
