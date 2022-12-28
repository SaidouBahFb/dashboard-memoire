import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const {orders} = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Payé</th>
          <th scope="col">Date</th>
          <th>Statut</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map((order) => (
            <tr key={order._id}>
              <td>
                <b>{order.user.name}</b>
              </td>
              <td>{order.user.email}</td>
              <td>{order.totalPrice} cfa</td>
              <td>
                {
                  order.isPaid ? (
                    <span className="badge rounded-pill alert-success">
                      Payé le {moment(order.paidAt).format('L')}
                    </span>
                  )
                  :
                  (
                    <span className="badge rounded-pill alert-danger">
                      Non payée
                    </span>
                  )
                }
                
              </td>
              <td>{moment(order.createdAt).format('MMM Do YY')}</td>
              <td>
              {
                  order.isDelivered ? (
                  <span span className="badge btn-success">Livré</span>                   
                  )
                  :
                  (
                    <span className="badge btn-dark">Non Livré</span>
                  )
                }
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          ))
        }
        
        {/* Not paid Not delivered */}
        {/*
          <tr>
          <td>
            <b>Velcro Sneakers For Boys & Girls (Blue)</b>
          </td>
          <td>user@example.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Non payé</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-dark">Non livré</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/order`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr>
        */}
      </tbody>
    </table>
  );
};

export default Orders;
