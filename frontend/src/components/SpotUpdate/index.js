import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk, createSpotThunk, updateSpotThunk, getCurrentUserSpotThunk } from "../../store/spot";
import { useParams, useHistory } from "react-router-dom";

import './updateSpot.css';

const UpdateSpot = () => {

    const spot = useSelector((state) => (state.spots.singleSpot))
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();


    const [country, setCountry] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [prevImage, setPrevImage] = useState();
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const [img4, setImg4] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getSpotThunk(parseInt(spotId)));
    }, [dispatch, spotId]);
    
    useEffect(() => {
        if (spot) {
            const {
                country,
                address,
                city,
                state,
                lat,
                lng,
                description,
                name,
                price
            } = spot;
    
            setCountry(country);
            setStreet(address);
            setCity(city);
            setState(state);
            setLatitude(lat);
            setLongitude(lng);
            setDescription(description);
            setName(name);
            setPrice(price);
        }
    }, [spot]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotObj = {
            ...spot,
            country,
            address: street,
            city,
            state,
            lat: latitude,
            lng: longitude,
            description,
            name,
            price
        };
    
        const errors = {};
        if (!country) {
            errors.country = 'Country is required';
        }
        if (!street) {
            errors.street = 'Address is required';
        }
        if (!city) {
            errors.city = 'City is required';
        }
        if (!state) {
            errors.state = 'State is required';
        }
        if (!latitude) {
            errors.latitude = 'Latitude is required';
        }
        if (!longitude) {
            errors.longitude = 'Longitude is required';
        }
        if (!description || description.length < 30) {
            errors.description = 'Description needs a minimum of 30 characters';
        }
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!price) {
            errors.price = 'Price is required';
        }
    
        const editedSpot = await dispatch(updateSpotThunk(spotObj));
    
        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            history.push(`/spots/${editedSpot.id}`);
        }
    };
    
    if (!spot) return null;
    if (spot.id === parseInt(spotId)) {


        return (

            Object.keys(spot).length > 1 && (
                <>

                    <div className='update-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='location'>
                                <h2>Update your Spot</h2>
                                <h3>Where's your place located?</h3>
                                <h5>Guests will only get your exact address once they booked a reservation.</h5>
                                <label>
                                    <div className='box'>
                                        Country
                                        <br />
                                        <div className='errors'>{errors.country}</div>
                                    </div>
                                    <input
                                        type='text'
                                        placeholder=' Country'
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <div className='box'>
                                        Street Address
                                        <div className='errors'>{errors.street}</div>
                                    </div>
                                    <input
                                        type='text'
                                        placeholder=' Address'
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </label>
                                <div className='city'>
                                    <label>
                                        <div className='box'>
                                            City
                                            <div className='errors'>{errors.city}</div>
                                        </div>
                                        <div className='city-input'>
                                            <div className='comma'>
                                                <input
                                                    type='text'
                                                    placeholder=' City'
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                /> ,
                                            </div>
                                        </div>
                                    </label>
                                    <label>
                                        <div className='box'>
                                            State
                                            <div className='errors'>{errors.state}</div>
                                        </div>
                                        <input
                                            type='text'
                                            placeholder=' STATE'
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className='lat'>
                                    <label>
                                        <div className='box'>
                                            Latitude
                                            <div className='errors'>{errors.latitude}</div>
                                        </div>
                                        <div className='lat-input'>
                                            <div className='comma'>
                                                <input
                                                    type='number'
                                                    placeholder='latitude'
                                                    min='-90'
                                                    max='90'
                                                    value={latitude}
                                                    onChange={(e) => setLatitude(e.target.value)}
                                                /> ,
                                            </div>
                                        </div>
                                    </label>
                                    <label>
                                        <div className='box'>
                                            Longitude
                                            <div className='errors'>{errors.longitude}</div>
                                        </div>
                                        <div className='lng-input'>
                                            <input
                                                type='number'
                                                placeholder='longitude'
                                                min='-180'
                                                max='180'
                                                value={longitude}
                                                onChange={(e) => setLongitude(e.target.value)}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className='description-box'>
                                <h3>Describe your place to guests</h3>
                                <h6>Mention the best features of your space, any special amentities like
                                    fast wif or parking, and what you love about the neighborhood.</h6>
                                <textarea
                                    value={description}
                                    placeholder=' Please write at least 30 characters'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className='errors'>{errors.description}</div>
                            </div>
                            <div className='name'>
                                <h3>Create a title for your spot</h3>
                                <h6>Catch guests' attention with a spot title that highlights what makes
                                    your place special.</h6>
                                <input
                                    type='text'
                                    placeholder=' Name of your spot'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div className='errors'>{errors.name}</div>
                            </div>
                            <div className='cost'>
                                <h3>Set a base price for your spot</h3>
                                <h6>Competitive pricing can help your listing stand out and rank higher
                                    in search results.</h6>
                                <label>
                                    <div className='price'>
                                        $ <input
                                            type='number'
                                            placeholder=' Price per night (USD)'
                                            min='1'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                </label>
                                <div className='errors'>{errors.price}</div>
                            </div>

                            <button type="submit">Update your Spot</button>
                        </form>
                    </div>

                </>
            )
        )


    }

}

export default UpdateSpot;