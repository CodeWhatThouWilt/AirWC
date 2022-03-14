import './Footer.css'
import { DiReact, DiGithubBadge, DiJavascript1, DiVisualstudio } from 'react-icons/di';
import { SiSequelize, SiCss3, SiExpress, SiPostgresql, SiRedux } from 'react-icons/si';
import { AiFillHtml5 } from 'react-icons/ai';
import { FaNodeJs } from 'react-icons/fa'


const Footer = () => {

    return (
        <div className='footer'>
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