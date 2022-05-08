import {useState} from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './elements/Home';
import Profile from './elements/Profile';
import NoPage from './elements/NoPage';
import CustomeAlert from './components/CustomeAlert'
import SalePets from './outlets/pets/SalePets';
import AdoptionPets from './outlets/pets/AdoptionPets';
import AllPets from './outlets/pets/AllPets';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import UserProfile from './outlets/profile/UserProfile';
import AddPet from './outlets/profile/AddPet';
import UserPets from './outlets/profile/UserPets';
import BookmarkedPets from './outlets/profile/BookmarkedPets';
import PrivateRoute from './PrivateRoute';
import PetDetail from './elements/PetDetail';
import Breed from './elements/Breed';
import AllBreeds from './outlets/breed/AllBreeds';
import AddBreed from './outlets/breed/AddBreed';
import EditPet from './elements/EditPet';
import BookmarkDetail from './elements/BookmarkDetail';
import ChangePassword from './auth/ChangePassword';
// import ResetPassword from './auth/ResetPassword';



function App() {
  const [show, setShow] = useState(true)

  return (
    <div id='body'>
      <HashRouter>
        <Header />
        {show && <CustomeAlert setShow={setShow} />}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />}>
                  <Route index element={<AllPets />} />
                  <Route path='sale' element={<SalePets />} />
                  <Route path="adoption" element={<AdoptionPets />} />
              </Route>
              <Route path="pet/:pet_name" element={<PetDetail />} />
              <Route path="edit-pet/:pet_name" element={<PrivateRoute><EditPet /></PrivateRoute>} />
              <Route path='bookmark/:id' element={<PrivateRoute><BookmarkDetail /></PrivateRoute>} />
              <Route path="breed" element={<Breed />}>
                <Route index element={<AllBreeds />} />
                <Route path="add" element={<PrivateRoute><AddBreed /></PrivateRoute>} />
                <Route path="*" element={<NoPage />} />
              </Route>
              <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>}>
                <Route index element={<UserProfile />} />
                <Route path="add-pet" element={<AddPet />} />
                <Route path="user-pets" element={<UserPets />} />
                <Route path="bookmarked-pets" element={<BookmarkedPets />} /> 
                <Route path="*" element={<NoPage />} />
              </Route>
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route path="change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
              {/* // <Route path="reset-password" element={<ResetPassword />} /> */}
              <Route path="*" element={<NoPage />} />
            </Routes>
          </div>
        <Footer />
      </HashRouter>
      
    </div>
  );
}

export default App;
