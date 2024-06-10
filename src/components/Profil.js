import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTransactions } from "../services/api";
import "./Profil.css";
import axios from "axios";
import { formatDate, formatTime } from "../utils/utils"; // Import function from utils.js

// Load Midtrans Snap script dynamically
const loadSnapScript = (src, onLoad) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
};

function Profile() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transactionsData = await fetchTransactions();
        console.log("Fetched transactions:", transactionsData); // Debug log
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    getTransactions();

    // Load Snap script on component mount
    loadSnapScript("https://app.sandbox.midtrans.com/snap/snap.js", () => {
      window.snap.pay = window.snap.pay.bind(window.snap);
    });
  }, []);

  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
    imageUrl: "https://via.placeholder.com/150",
  });

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          imageUrl: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateTransactionStatus = async (order_id) => {
    try {
      await axios.put("http://localhost:5000/api/transaction/update", {
        order_id: order_id,
        status: "SUCCES", // Corrected status spelling
      });
      console.log("Order status updated to SUCCES");
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleMidtransPayment = (token, order_id) => {
    window.snap.pay(token, {
      onSuccess: (result) => {
        console.log(order_id);
        console.log("Payment success:", result);
        updateTransactionStatus(order_id); // Call updateTransactionStatus on success
      },
      onPending: (result) => {
        console.log("Payment pending:", result);
      },
      onError: (result) => {
        console.log("Payment error:", result);
      },
      onClose: () => {
        console.log("Payment popup closed");
      },
    });
  };

  return (
    <div className="profilcontainer">
      <div className="row rowtop">
        {/* First Card: Display Profile Information */}
        <div className="col-md-6 profile">
          <div className="cardprofil">
            <div className="card-body">
              <div className="profile-image">
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="profile-info">
                <h2>{profile.fullName}</h2>
                <p>{profile.email}</p>
              </div>
              <button
                className="btn btn-danger mt-3"
                onClick={() => navigate("/")}>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Second Card: Edit Profile Information */}
        <div className="col-md-6 profile">
          <div className="profilcard">
            <div className="card-body">
              <div className="profile-details">
                <div className="detail-item">
                  <label htmlFor="fullName">Full Name:</label>
                  {showEdit ? (
                    <input
                      type="text"
                      id="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    <span className="form-control-static">
                      {profile.fullName}
                    </span>
                  )}
                </div>
                <div className="detail-item">
                  <label htmlFor="email">Email:</label>
                  {showEdit ? (
                    <input
                      type="email"
                      id="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    <span className="form-control-static">{profile.email}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label htmlFor="phone">Phone:</label>
                  {showEdit ? (
                    <input
                      type="tel"
                      id="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    <span className="form-control-static">{profile.phone}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label htmlFor="address">Address:</label>
                  {showEdit ? (
                    <input
                      type="text"
                      id="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    <span className="form-control-static">
                      {profile.address}
                    </span>
                  )}
                </div>
                {showEdit && (
                  <div className="detail-item">
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input
                      type="file"
                      id="profileImage"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                )}
                <button
                  className="btn btn-primary edit-button"
                  onClick={handleEdit}>
                  {showEdit ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History Card */}
      <div className="history-card">
        <div className="card-body">
          <h3>Purchase History</h3>
          <hr></hr>
          {transactions.length > 0 ? (
            transactions.map((trans) => (
              <div className="history-item">
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Tanggal Order</th>
                      <th>Judul Film</th>
                      <th>Kursi</th>
                      <th>Tanggal Tonton</th>
                      <th>Jam Tonton</th>
                      <th>Total Harga</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{formatDate(trans.created_at)}</td>
                      <td>{trans.name_film}</td>
                      <td>{trans.seat}</td>
                      <td>{formatDate(trans.dated)}</td>
                      <td>{formatTime(trans.hour)}</td>
                      <td>{trans.total}</td>
                      <td>{trans.status}</td>
                    </tr>
                  </tbody>
                </table>
                {trans.status === "PROSES" && (
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() =>
                      handleMidtransPayment(trans.token, trans.id_transaction)
                    }>
                    Pay Now
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No purchase history available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
