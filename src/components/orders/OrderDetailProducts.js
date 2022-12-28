import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const {order, loading} = props;

  if (!loading) {
    //Calculate price
    const addDecimals = (num) => {
      return (Math.round(num*100) / 100).toFixed(2);
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0)
    );
  }

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Produit</th>
          <th style={{ width: "20%" }}>Prix</th>
          <th style={{ width: "20%" }}>Quantité</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {
          order.orderItems.map((item, index) => (
            <tr key={index}>
              <td>
                <Link className="itemside" to="#">
                  <div className="left">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "40px", height: "40px" }}
                      className="img-xs"
                    />
                  </div>
                  <div className="info">
                    {item.name}{" "}
                  </div>
                </Link>
              </td>
              <td>{item.price} cfa</td>
              <td>{item.qty} </td>
              <td className="text-end">{item.qty * item.price} cfa</td>
            </tr>
          ))
        }
        

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Sous total:</dt> <dd>{order.itemsPrice} cfa</dd>
              </dl>
              <dl className="dlist">
                <dt>Frais de port:</dt> <dd>{order.shippingPrice} cfa</dd>
              </dl>
              <dl className="dlist">
                <dt>Montant total:</dt>
                <dd>
                  <b className="h5">{order.totalPrice} cfa</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Statut:</dt>
                <dd>
                  {
                    order.isPaid ? (
                      <span className="badge rounded-pill alert alert-success text-success">
                        Paiement effectué
                      </span>
                    )
                    :
                    (
                      <span className="badge rounded-pill alert alert-danger text-danger">
                        Non payé
                      </span>
                    )
                  }
                  
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
