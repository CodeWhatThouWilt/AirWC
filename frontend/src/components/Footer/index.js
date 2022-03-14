import './Footer.css'
import { DiReact, DiGithubBadge, DiJavascript1, DiVisualstudio } from 'react-icons/di';
import { SiSequelize, SiCss3, SiExpress, SiPostgresql, SiRedux } from 'react-icons/si';
import { AiFillHtml5 } from 'react-icons/ai';
import { FaNodeJs, FaToiletPaper } from 'react-icons/fa'
import { useState } from 'react';


const Footer = () => {
    const [movement, setMovement] = useState(-60);


    return (
        <div className='footer' style={{ bottom: movement}}>
            <div className='tab-holder'>
                <div className='toilet-paper-container'  onClick={() => movement === -60 ? setMovement(0) : setMovement(-60)}>
                    <FaToiletPaper />
                </div>
            </div>
            <SiRedux />
            <AiFillHtml5 />
            <SiCss3 />
            <SiExpress />
            <SiSequelize />
            <a href='https://github.com/CodeWhatThouWilt/AirWC' className='github-link'>
            <DiGithubBadge />
            </a>
            <SiPostgresql />
            <DiReact />
            <DiJavascript1 />
            <FaNodeJs />
            <DiVisualstudio />
        </div>
    )
}

export default Footer;