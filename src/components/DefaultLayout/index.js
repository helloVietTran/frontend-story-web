import './DefaultLayout.scss';

function DefaultLayout({children,backGround}) {
   
    return ( 
        <div className={`container ${backGround}`}>
            {children}
        </div>
     )
}

export default DefaultLayout;