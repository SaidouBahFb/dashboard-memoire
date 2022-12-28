import React, { useEffect, useState } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { editProduct, updateProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";


const categories = [
  "Chaussure Homme",
  "Pantalon Homme",
  "Chaussure Femme",
  "Pantalon Femme",
  "Chemise Homme",
  "Chemise Femme",
  "Robe",
  "Jube",
  "T-shirt",
  "Lacoste",
  "Costume Homme",
  "Autres"
];


const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000
  }

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const {loading, error, product} = productEdit;

  
  const productUpdate = useSelector((state) => state.productUpdate);
  const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate;

  useEffect(() => {

    if (successUpdate) {
      dispatch({type:PRODUCT_UPDATE_RESET})
      toast.success("Produit modifié avec succès", Toastobjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      }else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setCategory(product.category);
        setPrice(product.price);
      } 
    }
  }, [product,dispatch, productId,successUpdate])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(
      {
        _id:productId,
        name,
       price, 
       description,
        image, 
        countInStock, 
        category
      }
      ));
  }


  return (  
    <>
    <Toast/>
     <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Aller aux produits
            </Link>
            <h2 className="content-title">Modifier Produit</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publier maintenant
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
                {loadingUpdate && <Loading/>}

                {
                  loading ? <Loading/> : error ? <Message variant="alert-danger">{error}</Message>:
                  (
                      <>
                           <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Nom du produit
                    </label>
                    <input
                      type="text"
                      placeholder="Écrivez ici"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Prix
                    </label>
                    <input
                      type="number"
                      placeholder="Écrivez ici"
                      className="form-control"
                      id="product_price"
                      required
                      min={1}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Quantité en stock
                    </label>
                    <input
                      type="number"
                      placeholder="Écrivez ici"
                      className="form-control"
                      id="product_price"
                      required
                      min={0}
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Écrivez ici"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                  <label className="form-label">Categorie</label>
                  <select className="form-control" value={category} required onChange={(e) => setCategory(e.target.value)}>
                      <option value="" disabled selected>Choisir une catégorie</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                      </>
                  )
                }
               
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
