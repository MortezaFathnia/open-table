import Navbar from '@/app/components/Navbar';
import Description from './components/Description';
import Header from './components/Header';
import Images from './components/Images';
import ReservationCard from './components/ReservationCard';
import Reviews from './components/Reviews';

export default function RestaurantDetails() {
  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <Description />
        <Images />
        <Reviews />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  );
}
