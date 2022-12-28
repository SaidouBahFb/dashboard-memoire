import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import {useDispatch, useSelector} from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state)=> state.productList);
  const {loading, error, products} = productList;

  const productDelete = useSelector((state)=> state.productDelete);
  const {error:errorDelete , success:successDelete} = productDelete;


  useEffect(()=> {
    dispatch(listProducts());
  }, [dispatch,successDelete]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Produits</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Créer nouveau
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="recherche..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Toute catégorie</option>
                <option>Chaussures hommes</option>
                <option>Pantalons hommes</option>
                <option>Chaussures femmes</option>
                <option>Pantalons femmes</option>
                <option>Chemises</option>
                <option>Robes</option>
                <option>T-shirt</option>
                <option>Lacostes</option>
                <option>Jubes</option>
                <option>Autres</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Dernier ajout</option>
                <option>Pas cher</option>
                <option>La plus populaire</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>)}
          {
            loading ? (<Loading />)
            : error ? (<Message variant="alert-danger">{error}</Message>)
            :(
              <div className="row">
                {/* Products */}
                {products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            )
          }

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Précédent
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Suivant
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};


export default MainProducts;
