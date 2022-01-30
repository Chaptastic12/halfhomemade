import React from 'react';

const TopNav = props =>{

    if(props.invert){
        return  (
            <div className='TopNav-inv d-flex justify-content-center align-items-center text-center'>
                <span>Use discount code <strong>NEWBOOK2021</strong> for free shipping! <i className="fas fa-birthday-cake"/></span>
            </div>
        )
    }

    return(
        <div className='TopNav d-flex justify-content-center align-items-center text-center'>
            <span>Use discount code <strong>NEWBOOK2021</strong> for free shipping! <i className="fas fa-birthday-cake"/></span>
        </div>)    
}

export default TopNav;