
import { Cuisine, PRICE,Location, PrismaClient } from '@prisma/client';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';

const prisma=new PrismaClient();

export interface RestaurantCardType{
  id:number;
  name:string;
  main_image:string;
  cuisine:Cuisine;
  location:Location;
  slug:string;
  price:PRICE;
}


const fetchRestaurants=async():Promise<RestaurantCardType[]>=>{
  const restaurants=await prisma.restaurant.findMany({
    select:{
      id:true,
      name:true,
      main_image:true,
      cuisine:true,
      location:true,
      slug:true,
      price:true
    }
  });

  return restaurants;
}

export default async function Home() {
  const restaurants=await fetchRestaurants();
  
  return (
    <main>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap'>
        {restaurants.map((restaurant)=>(
          <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
        ))}    
      </div>
    </main>
  );
}
