import React from "react";
import SpotCard from "./SpotCard";


function Card() {

    return (
        <div className="card">
            <SpotCard
            location='location'
            imageUrl='AuthenticateMeProj/practice-for-sprint-12-authenticate-me-for-render-deployment/authenticate-me/frontend/images/spotIMG1.jpg'
            price='$129'/>
        </div>
    )
}
