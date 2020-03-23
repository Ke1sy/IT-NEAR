import React, {Suspense} from "react";
import Preloader from "../Preloader/Preloader";

const withSuspense = (WrappedComponent) => {
    return (props) => {
        return (
            <Suspense fallback={<Preloader showPreloader={true}/>}>
               <WrappedComponent {...props}/>
           </Suspense>
        )
    }
};

export default withSuspense;