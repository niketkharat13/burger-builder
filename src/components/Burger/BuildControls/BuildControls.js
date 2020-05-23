import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'
const controls= [
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"},
    {label:"Cheese", type:"cheese"},
    {label:"Meat", type:"meat"},
]
const BuildControls = (props)=>(
    <div className={classes.BuildControls}>
        <div>Currebt Price: <strong>{props.price.toFixed(2)}</strong></div>
        {controls.map(cltr=>{
          return  <BuildControl 
                    added={()=>props.addIngrediant(cltr.type)} 
                    key={cltr.label} 
                    label={cltr.label}
                    remove={()=>props.removeIngrediant(cltr.type)}
                    disable={props.isDisable[cltr.type]} />
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchase} >Order Now</button>
    </div>
);
export default BuildControls;