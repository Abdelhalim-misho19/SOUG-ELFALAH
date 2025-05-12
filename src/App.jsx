import React, { useEffect, lazy, Suspense } from 'react'; // Added lazy and Suspense
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Shipping from './pages/Shipping';
import Details from './pages/Details';
import Login from './pages/Login'; // Keep direct import if preferred
import Register from './pages/Register'; // Keep direct import if preferred
import { get_category, get_service_categories } from './store/reducers/homeReducer';
import { useDispatch } from 'react-redux';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import ChangePassword from './components/dashboard/ChangePassword';
import Wishlist from './components/dashboard/Wishlist';
import OrderDetails from './components/dashboard/OrderDetails';
import Chat from './components/dashboard/Chat';
import ConfirmOrder from './pages/ConfirmOrder';
import Service from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Booking from './pages/Booking';
import MyBookings from './components/dashboard/MyBookings';
import BookingDetails from './components/dashboard/BookingDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

// --- Lazy load new components ---
const ForgotPassword = lazy(() => import('./pages/ForgotPassword')); // Assuming they are in pages directory
const ResetPassword = lazy(() => import('./pages/ResetPassword'));   // Assuming they are in pages directory

// Simple Loader Component for Suspense
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    Loading...
  </div>
);


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
    dispatch(get_service_categories());
  }, [dispatch]); // Added dispatch to dependency array


  return (
    <BrowserRouter>
      {/* Wrap Routes with Suspense for lazy loading */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* --- Existing Public Routes --- */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shops' element={<Shops />} />
          <Route path='/card' element={<Card />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/products?' element={<CategoryShop />} />
          <Route path='/products/search?' element={<SearchProducts />} />
          <Route path='/product/details/:slug' element={<Details />} />
          <Route path='/order/confirm' element={<ConfirmOrder />} />
          <Route path='/services' element={<Service />} />
          <Route path="/service/details/:slug" element={<ServiceDetails />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />

          {/* --- New Password Reset Routes --- */}
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          {/* The :token makes it a URL parameter */}

          {/* --- Protected Routes --- */}
          <Route path='/dashboard' element={<ProtectUser />} >
            <Route path='' element={<Dashboard />} >
              <Route path='' element={<Index />} />
              <Route path='my-orders' element={<Orders />} />
              <Route path='my-bookings' element={<MyBookings />} />
              <Route path='booking/details/:bookingId' element={<BookingDetails />} />
              <Route path='change-password' element={<ChangePassword />} />
              <Route path='my-wishlist' element={<Wishlist />} />
              <Route path='order/details/:orderId' element={<OrderDetails />} />
              <Route path='chat' element={<Chat />} />
              <Route path='chat/:sellerId' element={<Chat />} />
            </Route>
          </Route>

          {/* Optional: Add a 404 Not Found Route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;