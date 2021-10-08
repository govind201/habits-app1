import React, {useState} from "react";
import {get, post} from "../../utils/fetch";
const Catalogue  = ({googleid, sellFish})=>{
    const [catalogueFish, setCatalogueFish] = useState({
        total: [], 
        selected:[],
        selectedFishTotal: 0,
    });

    const killFish = () => {
        var f;
        for (f = 0; f < catalogueFish.selected.length; f++){
            const body = {type: catalogueFish.selected[f].type, googleid};
            post("/api/kill-fish", body);
            sellFish(catalogueFish.selected[f]);
        }
        post("/api/increment-money", {amount: catalogueFish.selectedFishTotal}).then((money) => {
        });
        setCatalogueFish((prev)=>({
            ...prev,
            selected : [],
            selectedFishTotal: 0
        }));
        
    }

    return <div>
        hello;
    </div>
}


export default Catalogue;   