import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_REQUEST } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";

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
  "Bazin Homme",
  "Bazin Femme",
  "Tenue Africaine Homme",
  "Tenue Africaine Femme",
  "Autres"
];

const Toastobjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
}

const AddProductMain = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");


  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {loading, error, product} = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Produit ajouté avec succès", Toastobjects);
      dispatch({type:PRODUCT_CREATE_REQUEST});
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setCategory("");
      setPrice(0);
    }
  }, [product,dispatch])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, price, description, image, countInStock, category));
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
            <h2 className="content-title">Ajouté produit</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publier
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                {error && <Message variant="alert-danger">{error}</Message>}
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
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Quantité en Stock
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
                    <label htmlFor="product_categorie" className="form-label">
                      Catégorie
                    </label>
                    <select className="form-control" required onChange={(e) => setCategory(e.target.value)}>
                      <option value="" disabled selected>Choisir une catégorie</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
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
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL Image du produit"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
