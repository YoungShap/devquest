import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Form.css'
import './FormBtn.css'
import { BiRefresh } from 'react-icons/bi';
import { GeneralContext } from '../App';
import Joi from 'joi';


export default function AddProject() {
    const { user, snackbar } = React.useContext(GeneralContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        dev: '',
        imgSrc: '',
        favorite: false,
        ghub: '',
    });

    const ProjectSchema = Joi.object({
        name: Joi.string().min(3).max(18).required(),
        category: Joi.string().required(),
        dev: Joi.string().min(3).max(16).required(),
        ghub: Joi.string().max(500).required(),
    });
    const handleInputChange = (ev) => {
        const { id, value } = ev.target;

        setFormData((prevState) => {
            const updatedFormData = {
                ...prevState,
                [id]: value,
            };

            // Perform validation
            const schema = ProjectSchema.validate(updatedFormData, { abortEarly: false, allowUnknown: true });
            const err = {};

            if (schema.error) {
                schema.error.details.forEach((error) => {
                    err[error.context.key] = error.message;
                });
                setIsValid(false);
            } else {
                setIsValid(true);
            }

            // Update errors state
            setErrors(err);

            return updatedFormData;
        });
    };

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];

        setFormData((prevState) => {
            return {
                ...prevState,
                imgSrc: file || ''// Save the File object or an empty string if no file is selected
            };
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
        formDataToSend.append('uploadBy', user.devName);

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
                snackbar("Project Added Successfully")
                navigate('/');
            })
            .catch((err) => {
                snackbar('Validation Error');
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
                        {errors.name ? <div className='fieldError'>{errors.name}</div> : ''}
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
                        {errors.category ? <div className='fieldError'>{errors.category}</div> : ''}
                    </div>
                </div>
                <div className='ghub'>
                    <div className='column'>
                        <label>GitHub Link*</label>
                        <input type="text" id='ghub' value={formData.ghub} onChange={handleInputChange} />
                        {errors.ghub ? <div className='fieldError'>{errors.ghub}</div> : ''}
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        <label>Developer Name*</label>
                        <input type="text" id='dev' value={formData.dev} onChange={handleInputChange} />
                        {errors.dev ? <div className='fieldError'>{errors.dev}</div> : ''}
                    </div>
                    <div className='column'>
                        <label>Image Upload(Optional)</label>
                        <input type="file" id="imgSrc" onChange={handleFileChange} accept="image/*" />
                    </div>
                </div>
                <div className='options2'>
                    <div className='actions'>
                        <button className='cancel' onClick={() => navigate('/')}>CANCEL</button>
                        <button className='refresh'><BiRefresh size={22} /></button>
                    </div>
                    <button className='submitG' onClick={Add} disabled={!isValid}>SUBMIT</button>
                </div>
            </form>
        </div>
    )
}
