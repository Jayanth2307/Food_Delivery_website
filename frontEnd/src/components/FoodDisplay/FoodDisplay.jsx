import { useContext } from 'react'
import './FoodDisplay.css'
import FoodItemCard from '../FoodItemCard/FoodItemCard'
import {StoreContext} from '../../context/StoreContext'

//itrate in food_list and for each item call foodItem component and pass the item as props

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes on the MENU</h2>
        <div className='food-items-display'>
            {
                food_list.map((food, index) => {
                    if( category === 'All' || food.category === category){
                        return <FoodItemCard key={index} id={food._id} name={food.name} image={food.image} price={food.price} description={food.description} />
                    }
            })}
        </div>
    </div>
  
    )
}

export default FoodDisplay