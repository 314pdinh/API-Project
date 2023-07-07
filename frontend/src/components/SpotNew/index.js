import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk, createSpotThunk } from "../../store/spot";
import { useParams, useHistory } from "react-router-dom";

const CreateForm = () => {
    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
        // image: '',
    };

    const history = useHistory();
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const SpotImages = [
        { preview: true, url: image },
        { preview: false, url: img1 },
        { preview: false, url: img2 },
        { preview: false, url: img3 },
        { preview: false, url: img4 }]

    SpotImages.forEach((image) => {
        if (image.url === '') {
            image.url = 'https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg'
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotObj = {
            ...spot,
            country,
            address: street,
            city,
            state,
            description,
            name,
            price,
            SpotImages
        };

        const errors = {}
        if (!country) {
            errors.country = 'Country is required'
        }
        if (!street) {
            errors.street = 'Address is required'
        }
        if (!city) {
            errors.city = 'City is required'
        }
        if (!state) {
            errors.state = 'State is required'
        }
        if (!description || description.length < 30) {
            errors.description = 'Description needs a minimum of 30 characters'
        }
        if (!name) {
            errors.name = 'Name is required'
        }
        if (!price) {
            errors.price = 'Price is required'
        }

        if (!image) {
            errors.previewImage = 'Preview Image is required'
        }
        if (image && !(image.endsWith('.png') || image.endsWith('.jpg') || image.endsWith('.jpeg'))) {
            errors.image = 'Image URL must end with .png, .jpg, or .jpeg'
        }
        if (img1 && !(img1.endsWith('.png') || img1.endsWith('.jpg') || img1.endsWith('.jpeg'))) {
            errors.img1 = 'Image URL must end with .png, .jpg, or .jpeg'
        }
        if (img2 && !(img2.endsWith('.png') || img2.endsWith('.jpg') || img2.endsWith('.jpeg'))) {
            errors.img2 = 'Image URL must end with .png, .jpg, or .jpeg'
        }
        if (img3 && !(img3.endsWith('.png') || img3.endsWith('.jpg') || img3.endsWith('.jpeg'))) {
            errors.img3 = 'Image URL must end with .png, .jpg, or .jpeg'
        }
        if (img4 && !(img4.endsWith('.png') || img4.endsWith('.jpg') || img4.endsWith('.jpeg'))) {
            errors.img4 = 'Image URL must end with .png, .jpg, or .jpeg'
        }


        if (Object.values(errors).length > 0) {
            setErrors(errors);
        } else {
            const newSpot = await dispatch(createSpotThunk(spotObj, SpotImages));
            history.push(`/spots/${newSpot.id}`)
        }
        if (!spot) {
            return null;
        }
    };
    return (
        <div className='spot-form'>
            <form onSubmit={handleSubmit}>
                <div className='location'>
                    <h2>Create a new Spot</h2>
                    <h3>Where's your place located?</h3>
                    <h5>Guests will only get your exact address once they booked a reservation.</h5>
                    <label>
                        <div className='flex'>
                            Country
                            <br></br>
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
                        <div className='flex'>
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
                            <div className='flex'>
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
                            <div className='flex'>
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
                </div>
                <div className='descript'>
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
                                step='1'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className='errors'>{errors.price}</div>
                </div>
                <div className='pic'>
                    <h3>Liven up your spot with photos</h3>
                    <h5>Submit a link to at least one photo to publish your spot.</h5>
                    <input
                        type='text'
                        placeholder=" Preview Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <div className='errors'>{errors.previewImage}</div>
                    <div className='errors'>{errors.image}</div>
                    <input
                        type='text'
                        placeholder=" Image URL"
                        value={img1}
                        onChange={(e) => setImg1(e.target.value)}
                    />
                    <div className='errors'>{errors.img1}</div>
                    <input
                        type='text'
                        placeholder=" Image URL"
                        value={img2}
                        onChange={(e) => setImg2(e.target.value)}
                    />
                    <div className='errors'>{errors.img2}</div>
                    <input
                        type='text'
                        placeholder=" Image URL"
                        value={img3}
                        onChange={(e) => setImg3(e.target.value)}
                    />
                    <div className='errors'>{errors.img3}</div>
                    <div className='lastimg'>
                        <input
                            type='text'
                            placeholder=" Image URL"
                            value={img4}
                            onChange={(e) => setImg4(e.target.value)}
                        />
                        <div className='errors'>{errors.img4}</div>
                    </div>
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default CreateForm;