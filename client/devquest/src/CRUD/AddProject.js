import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Form.css'
import './FormBtn.css'
import { BiRefresh } from 'react-icons/bi';
import { GeneralContext } from '../App';

export default function AddProject() {
    const { user } = React.useContext(GeneralContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        dev: '',
        imgSrc: '',
        favorite: false,
        ghub: '',
    });

    // const cardSchema = Joi.object({
    //     name: Joi.string().min(3).max(50).required(),
    //     subtitle: Joi.string().min(0).max(50).empty(),
    //     description: Joi.string().min(3).max(500).required(),
    //     techId: Joi.number().min(0).max(0),
    //     email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    //     web: Joi.string().required(),
    //     imgUrl: Joi.string().min(0).max(550),
    //   });

    const handleInputChange = (ev) => {
        const { id, value } = ev.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        // const schema = cardSchema.validate(obj, { abortEarly: false, allowUnknown: true });
        // const err = { ...errors, [id]: undefined };

        // if (schema.error) {
        //     const error = schema.error.details.find(e => e.context.key === id);

        //     if (error) {
        //         err[id] = error.message;
        //     }
        //     setIsValid(false);
        // } else {
        //     setIsValid(true);
        // }

        // setErrors(err);
    };
    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        setFormData({
            ...formData,
            imgSrc: file || '', // Save the File object or an empty string if no file is selected
        });
    };


    function Add(ev) {
        ev.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('dev', formData.dev);
        formDataToSend.append('imgSrc', formData.imgSrc);
        formDataToSend.append('ghub', formData.ghub);
        formDataToSend.append('ownerId', user.devName);

        fetch(`http://localhost:4000/projects/add`, {
            credentials: 'include',
            headers: {
                'Authorization': localStorage.token
            },
            method: 'POST',
            body: formDataToSend,
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
                //   snackbar("Card Added Successfully")
            })
            .catch((err) => {
                //   snackbar(err.message);
                navigate('/error');
                console.log(err);
            });
    }

    return (
        <div className="container2">
            <h2>Add Project</h2>

            <form>
                <div className='row'>
                    <div className='column'>
                        <label>Project Name*</label>
                        <input type="text" id='name' value={formData.name} onChange={handleInputChange} />
                        {/* {errors.name ? <div className='fieldError'>{errors.name}</div> : ''} */}
                    </div>
                    <div className='column'>
                        <label>Category*</label>
                        <select placeholder='Choose...' id='category' value={formData.category} onChange={handleInputChange}>
                            <option value="">Choose...</option>
                            <option value="Mern">MERN</option>
                            <option value="Mean">MEAN</option>
                            <option value="Ruby">Ruby</option>
                            <option value="React">React</option>
                            <option value="Angular">Angular</option>
                            <option value="JS" >JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="PhP">PHP</option>
                            <option value="HTMLCSS">HTML&CSS</option>
                        </select>
                        {/* {errors.description ? <div className='fieldError'>{errors.description}</div> : ''} */}
                    </div>
                </div>
                <div className='ghub'>
                    <div className='column'>
                        <label>GitHub Link*</label>
                        <input type="text" id='ghub' value={formData.ghub} onChange={handleInputChange} />
                        {/* {errors.ghub ? <div className='fieldError'>{errors.ghub}</div> : ''} */}
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        <label>Developer Name*</label>
                        <input type="text" id='dev' value={formData.dev} onChange={handleInputChange} />
                        {/* {errors.dev ? <div className='fieldError'>{errors.dev}</div> : ''} */}
                    </div>
                    <div className='column'>
                        <label>Image Upload*</label>
                        <input type="file" id="imgSrc" onChange={handleFileChange} accept="image/*" />
                        {/* {errors.imgSrc ? <div className='fieldError'>{errors.imgSrc}</div> : ''} */}
                    </div>
                </div>
                <div className='options2'>
                    <div className='actions'>
                        <button className='cancel' onClick={() => navigate('/')}>CANCEL</button>
                        <button className='refresh'><BiRefresh size={22} /></button>
                    </div>
                    <button className='submitG' onClick={Add}>SUBMIT</button>
                </div>
            </form>
        </div>
    )
}
