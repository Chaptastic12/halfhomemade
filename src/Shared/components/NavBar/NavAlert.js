import React from 'react';

const NavAlert = props =>{

    if(props.invert){
        return  (
            <div className='NavAlert Invert'>
                <span>Use discount code <strong>NEWBOOK2021</strong> for free shipping! <i className="fas fa-birthday-cake"/></span>
            </div>
        )
    }

    return(
        <div className='NavAlert'>
            <span>Use discount code <strong>NEWBOOK2021</strong> for free shipping! <i className="fas fa-birthday-cake"/></span>
        </div>)    
}

export default NavAlert;