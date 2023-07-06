import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk, createSpotThunk } from "../../store/spot";
import { useParams, useHistory } from "react-router-dom";
import "./SpotNew.css";

const createForm = () => {
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
  
    const [formValues, setFormValues] = useState({
      country: "",
      address: "",
      city: "",
      state: "",
      description: "",
      name: "",
      price: "",
      previewUrl: "",
      url1: "",
      url2: "",
      url3: "",
      url4: "",
    });
  
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      if (!currentUser) {
        history.push("/");
      }
    }, [currentUser, history]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
  
      const newSpot = {
        country: formValues.country,
        address: formValues.address,
        city: formValues.city,
        state: formValues.state,
        description: formValues.description,
        name: formValues.name,
        price: formValues.price,
      };
  
      const imagesArray = [
        { url: formValues.previewUrl, preview: true },
        { url: formValues.url1, preview: false },
        { url: formValues.url2, preview: false },
        { url: formValues.url3, preview: false },
        { url: formValues.url4, preview: false },
      ];
  
      dispatch(createSpotThunk(newSpot, imagesArray))
        .then((spot) => history.push(`/spots/${spot.id}`))
        .catch((err) => {
          setErrors(
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors
              : {}
          );
        });
    };
  
    return (
      <div className="spot-new-container">
        <form className="spot-new-form" onSubmit={handleSubmit}>
          <div className="form-element">
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they book a reservation.</p>
            <input
              type="text"
              name="country"
              value={formValues.country}
              onChange={handleChange}
              placeholder="Country"
            />
            {errors.country && <div className="errors">{errors.country}</div>}
            <input
              type="text"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {errors.address && <div className="errors">{errors.address}</div>}
            <div className="city-state">
              <input
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                placeholder="City"
              />
              {errors.city && <div className="errors">{errors.city}</div>}
              <input
                type="text"
                name="state"
                value={formValues.state}
                onChange={handleChange}
                placeholder="State"
              />
              {errors.state && <div className="errors">{errors.state}</div>}
            </div>
          </div>
  
          <div className="form-element">
  <h2>Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
            </p>
            <textarea
              rows="5"
              cols="50"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Please write at least 30 characters"
            ></textarea>
            {errors.description && <div className="errors">{errors.description}</div>}
          </div>
  
          <div className="form-element spot-title">
            <h2>Create a title for your spot</h2>
            <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Name of your spot"
            />
            {errors.name && <div className="errors">{errors.name}</div>}
          </div>
  
          <div className="form-element">
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label style={{ width: "fit-content" }} htmlFor="price">
                $
              </label>
              <input
                style={{ width: "100%" }}
                type="text"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                placeholder="Price per night (USD)"
              />
            </div>
            {errors.price && <div className="errors">{errors.price}</div>}
          </div>
  
          <div className="form-element">
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <input
              style={{ width: "95%" }}
              type="text"
              name="previewUrl"
              value={formValues.previewUrl}
              onChange={handleChange}
              placeholder="Preview Image URL"
            />
            {errors.previewUrl && <div className="errors">{errors.previewUrl}</div>}
            <input
              className="form-photos-input"
              type="text"
              name="url1"
              value={formValues.url1}
              onChange={handleChange}
              placeholder="Image URL"
            />
            {errors.url1 && <div className="errors">{errors.url1}</div>}
            <input
              className="form-photos-input"
              type="text"
              name="url2"
              value={formValues.url2}
              onChange={handleChange}
              placeholder="Image URL"
            />
            {errors.url2 && <div className="errors">{errors.url2}</div>}
            <input
              className="form-photos-input"
              type="text"
              name="url3"
              value={formValues.url3}
              onChange={handleChange}
              placeholder="Image URL"
            />
            {errors.url3 && <div className="errors">{errors.url3}</div>}
            <input
              className="form-photos-input"
              type="text"
              name="url4"
              value={formValues.url4}
              onChange={handleChange}
              placeholder="Image URL"
            />
            {errors.url4 && <div className="errors">{errors.url4}</div>}
          </div>
  
          <div className="submit-button" style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" style={{ width: "100%", marginTop: "5%", all:"unset" }}>
              Create Spot
            </button>
          </div>
        </form>
      </div>
    );
  };
  

export default createForm;