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
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
        PrevImage: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            const errors = {};
            if (!formValues.country)
                errors.country = 'Country is required';
            if (formValues.country.length < 5 || formValues.country.length > 50)
                errors.country = 'Please enter a valid country';

            if (!formValues.address)
                errors.address = 'Address is required';
            if (formValues.address.length < 10 || formValues.address.length > 250)
                errors.address = 'Please enter a valid address';

            if (!formValues.city)
                errors.city = 'City is required';
            if (formValues.city.length < 5 || formValues.city.length > 50)
                errors.city = 'Please enter a valid city';

            if (!formValues.state)
                errors.state = 'State is required';
            if (formValues.state.length < 5 || formValues.state.length > 50)
                errors.state = 'Please enter a valid state';

            if (!formValues.description)
                errors.description = 'Description is required';
            if (formValues.description.length < 30)
                errors.description = 'Description needs a minimum of 30 characters';

            if (!formValues.name)
                errors.name = 'Name is required';
            if (formValues.name.length < 5 || formValues.name.length > 50)
                errors.name = 'Please enter a valid name';

            if (!formValues.price || !Number(formValues.price))
                errors.price = 'Price is required';

            if (!formValues.PrevImage.trim()) {
                errors.PrevImage = 'Preview image is required';
            } else if (
                !formValues.PrevImage.endsWith('.jpg') &&
                !formValues.PrevImage.endsWith('.jpeg') &&
                !formValues.PrevImage.endsWith('.png')
            ) {
                errors.PrevImage = 'Image URL must end in .png, .jpg, or .jpeg';
            }

            setValidationErrors(errors);
        };

        validateForm();
    }, [formValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!Object.values(validationErrors).length) {
            const images = [
                formValues.PrevImage,
                formValues.image2,
                formValues.image3,
                formValues.image4,
                formValues.image5,
            ];

            const newSpot = await dispatch(createSpotThunk(formValues, images));
            history.push(`/spots/${newSpot.id}`);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            history.push('/');
        }
    }, [currentUser, history]);

    return (
        <div className="form-container">
            <div className="spot-form">
                <form onSubmit={handleSubmit}>
                    <div className="location-info">
                        <h2>Create a new Spot</h2>
                        <h3>Where's your place located?</h3>
                        <p>
                            Guests will only get your exact address once they book a
                            reservation.
                        </p>
                    </div>
                    <label className="form-labels">
                        <div className="input-label" id="country-label">
                            Country
                        </div>
                        {validationErrors.country && submitted && (
                            <p className="errors">{validationErrors.country}</p>
                        )}
                        <input
                            id="form-country"
                            className="input-field"
                            placeholder="Country"
                            type="text"
                            name="country"
                            value={formValues.country}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="form-labels">
                        <div className="input-label" id="address-label">
                            Street Address
                        </div>
                        {validationErrors.address && submitted && (
                            <p className="errors">{validationErrors.address}</p>
                        )}
                        <input
                            id="form-address"
                            className="input-field"
                            placeholder="Address"
                            type="text"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="city-state">
                        <label className="form-labels" id="city-label">
                            <div className="input-label">City</div>
                            {validationErrors.city && submitted && (
                                <p className="errors">{validationErrors.city}</p>
                            )}
                            <input
                                id="form-city"
                                className="input-field"
                                placeholder="City"
                                type="text"
                                name="city"
                                value={formValues.city}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="form-labels" id="state-label">
                            <div className="input-label">State</div>
                            {validationErrors.state && submitted && (
                                <p className="errors">{validationErrors.state}</p>
                            )}
                            <input
                                id="form-state"
                                className="input-field"
                                placeholder="State"
                                type="text"
                                name="state"
                                value={formValues.state}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-words">
                        <h3>Describe your place to guests</h3>
                        <p>
                            Mention the best features of your space, any special amenities
                            like fast wifi or parking, and what you love about the
                            neighborhood.
                        </p>
                    </div>
                    <label className="form-labels" id="description-label">
                        <textarea
                            rows="5"
                            cols="50"
                            id="form-description"
                            className="input-field"
                            placeholder="Please write at least 30 characters"
                            type="text"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                        />
                        {validationErrors.description && submitted && (
                            <p className="errors">{validationErrors.description}</p>
                        )}
                    </label>
                    <div className="form-words">
                        <h3>Create a title for your spot</h3>
                        <p>
                            Catch guests' attention with a spot title that highlights what
                            makes your place special.
                        </p>
                    </div>
                    <label className="form-labels" id="name-label">
                        <input
                            id="form-name"
                            className="input-field"
                            placeholder="Name of your spot"
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                        />
                        {validationErrors.name && submitted && (
                            <p className="errors">{validationErrors.name}</p>
                        )}
                    </label>
                    <div className="form-words">
                        <h3>Set a base price for your spot</h3>
                        <p>
                            Competitive pricing can help your listing stand out and rank
                            higher in search results.
                        </p>
                    </div>
                    <label className="form-labels" id="price-label">
                        <input
                            id="form-price"
                            className="input-field"
                            placeholder="Price per night (USD)"
                            type="text"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                        />
                        {validationErrors.price && submitted && (
                            <p className="errors">{validationErrors.price}</p>
                        )}
                    </label>
                    <div className="form-words">
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot</p>
                    </div>
                    <label className="img-link-box">
                        <input
                            className="input-field"
                            placeholder="Preview Image URL"
                            type="text"
                            name="image"
                            value={formValues.image}
                            onChange={handleChange}
                        />
                        {validationErrors.image && submitted && (
                            <p className="errors">{validationErrors.image}</p>
                        )}
                        <input
                            className="input-field"
                            placeholder="Image URL"
                            type="text"
                            name="img2"
                            value={formValues.img2}
                            onChange={handleChange}
                        />
                        <input
                            className="input-field"
                            placeholder="Image URL"
                            type="text"
                            name="img3"
                            value={formValues.img3}
                            onChange={handleChange}
                        />
                        <input
                            className="input-field"
                            placeholder="Image URL"
                            type="text"
                            name="img4"
                            value={formValues.img4}
                            onChange={handleChange}
                        />
                        <input
                            className="input-field"
                            placeholder="Image URL"
                            type="text"
                            name="img5"
                            value={formValues.img5}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="cushion">
                        <button type="submit" id="spot-create">
                            Create Spot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default createForm;