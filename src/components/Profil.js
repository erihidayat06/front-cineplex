import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PurchaseContext } from "./PurchaseContext";
import "./Profil.css";

function Profile() {
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
  const { purchaseHistory } = useContext(PurchaseContext);

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
                  alt="Profile Picture"
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
          {purchaseHistory.map((history) => (
            <div key={history.id} className="history-item">
              <p>{history.item}</p>
              <p>{history.date}</p>
              <p>Price: Rp.{history.price}</p>
              <p>Show Time: {history.showTime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
