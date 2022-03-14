import './Footer.css'
import { DiReact, DiGithubBadge  } from 'react-icons/di';
import { SiSequelize, SiCss3, SiExpress } from 'react-icons/si';
import { AiFillHtml5 } from 'react-icons/ai';


const Footer = () => {

    return(
        <div>
            <AiFillHtml5 />
            <SiCss3 />
            <SiSequelize />
            <DiReact />
            <DiGithubBadge />
        </div>
    )
}

export default Footer;