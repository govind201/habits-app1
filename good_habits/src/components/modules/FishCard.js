
import React from "react";

const FishCard = ({clicked, fish, displayFish, gbucks})=>{
    return <div onClick={clicked()}>
         <div className="content u-textCenter u-pointer">
                    <img src={displayFish(fish.type)} width="100%" alt="not found" ></img>
                        <div className="InventoryCard-price">
                        <span>{fish.price}</span>
                          <span><img src={gbucks} style={{display:"inline-block", width:"20px", height:"20px", margin: "5px 0 -5px 0"}} alt="not found"></img></span>
                          
                            
                        </div>
                
            </div>    
    </div>
}

export default FishCard;