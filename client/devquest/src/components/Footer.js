import React from 'react'
import './Footer.css'
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebhookIcon from '@mui/icons-material/Webhook';

export default function Footer() {
    return (
        <div className='footer-container'>

            <div className='footer-content'>
                    <p style={{ marginTop: '20px' }}>Created By: <b>Aviv Shapira All rights reserved Copyright ©</b></p>
                <>
                    <p className='icon-p' style={{ fontSize: '26px', textAlign: 'center', color: '#c4cba7ba' }}>
                        <WebhookIcon sx={{ fontSize: '38px', marginBottom: '2px', padding: '4px' }} /><b>Contact Us : </b>thedevquest@hotmail.com
                    </p>
                </>
                <div className='footer-icons'>
                    <Link to={'https://www.linkedin.com/in/aviv-shapira-466561226/'} target="_blank"><FaLinkedin size={48} style={{ color: '#5894f1' }} /></Link>
                    <Link to={'https://github.com/YoungShap'} target="_blank" ><GitHubIcon style={{ color: 'white', fontSize: '48px', borderRadius: '50%',marginBottom:'2px' }} /></Link>
                </div>

            </div>






        </div>
    )
}
