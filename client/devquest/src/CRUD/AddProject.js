import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Form.css'
import './FormBtn.css'
import { BiRefresh } from 'react-icons/bi';

export default function AddProject() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        dev: '',
        imgSrc: '',
        favorite: '',
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

    const handleInputChange = ev => {
        const { id, value } = ev.target;
        let obj = {
            ...formData,
            [id]: value,
        };
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

        setFormData(obj);
        // setErrors(err);
    };

    function Add(ev) {
        ev.preventDefault();
        fetch(`http://localhost:4000/projects/add`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
          })
            .then(res => res.json())
            .then(data => {
              setFormData(data);
            //   snackbar("Card Added Sucssesfully")
              navigate('/');
            }
            )
            .catch(err => {
            //   snackbar(err.message);
              navigate('/error');
            })
            // .finally(() => setIsLoading(false));
    }


    return (
        <div className="container2">
            <h2>Add Project</h2>

            <form>
                <div className='row'>
                    <div className='column'>
                        <label>Project Name*</label>
                        <input type="text" id='title' value={formData.name} onChange={handleInputChange} />
                        {/* {errors.title ? <div className='fieldError'>{errors.title}</div> : ''} */}
                    </div>
                    <div className='column'>
                        <label>subtitle*</label>
                        <input type="text" id='subtitle' value={formData.subtitle} onChange={handleInputChange} />
                        {/* {errors.subtitle ? <div className='fieldError'>{errors.subtitle}</div> : ''} */}
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        <label>description*</label>
                        <input type="text" id='description' value={formData.description} onChange={handleInputChange} />
                        {/* {errors.description ? <div className='fieldError'>{errors.description}</div> : ''} */}
                    </div>
                    <div className='column'>
                        <label>Phone*</label>
                        <input type="tel" id='phone' value={formData.phone} onChange={handleInputChange} />
                        {/* {errors.phone ? <div className='fieldError'>{errors.phone}</div> : ''} */}
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        <label>Email*</label>
                        <input type="email" id='email' value={formData.email} onChange={handleInputChange} />
                        {/* {errors.email ? <div className='fieldError'>{errors.email}</div> : ''} */}
                    </div>
                    <div className='column'>
                        <label>web*</label>
                        <input type="text" id='web' value={formData.web} onChange={handleInputChange} />
                        {/* {errors.web ? <div className='fieldError'>{errors.web}</div> : ''} */}
                    </div>
                </div>
                <div className='options2'>
                    <div className='actions'>
                        <button className='cancel' onClick={() => navigate('/')}>CANCEL</button>
                        <button className='refresh'><BiRefresh size={22} /></button>
                    </div>
                    <button className='submitG' onClick={AddProject}>SUBMIT</button>
                </div>
            </form>
        </div>
    )
}
