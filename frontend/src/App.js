import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import StaffRoutes from './utils/StaffRoutes';
import ManagersRoutes from './utils/ManagersRoutes';
import { AuthProvider } from './context/AuthContext';


import  UsersLayout  from './utils/layouts/UsersLayout';
import HomePage from './pages/users/HomePage';
import Profile  from './pages/users/Profile';

import  AdminLayout  from './utils/layouts/AdminLayout';
import AdminPage from './pages/admin/AdminPage';
import AdminProfile  from './pages/admin/AdminProfile';
import  Users  from './pages/admin/Users';
import AddUser from './components/AddUser';
import EditUser from './pages/admin/EditUser';
import Requests from './pages/admin/Requests';



import ManagerLayout from './utils/layouts/ManagerLayout';
import ManagerPage from './pages/manager/ManagerPage';
import Categories from './pages/manager/categories/Categories';
import AddCategory from './pages/manager/categories/AddCategory';
import EditCategory from './pages/manager/categories/EditCategory';
import ManagerProfile from './pages/manager/ManagerProfile';
import Articles from './pages/manager/articles/Articles';
import AddArticle from './pages/manager/articles/AddArticle';
import EditArticle from './pages/manager/articles/EditArticle';



import LoginPage from './pages/LoginPage';
import HandleSingleRequest from './pages/admin/HandleSingleRequest';
import PageNotFound from './components/PageNotFound';
import ProfileCard from './components/ProfileCard';
import UserProfileCard from './components/UserProfileCard';
import ManagerProfileCard from './components/ManagerProfileCard';
import FollowUp from './pages/users/FollowUp';
import FollowUpDetails from './pages/users/FollowUpDetails';
import AddRequestForm from './pages/users/AddRequestForm';


function App() {
  return (
    <div className="App">
      <Router >
        <AuthProvider>

          <Routes>
            <Route element = {<PrivateRoutes />}>
              <Route path = '/' element={<UsersLayout />}  exact >
                <Route index element={<HomePage />} /> 
                <Route path='profile' element={<UserProfileCard />} />
                <Route path='profile/update' element={<Profile />} />
                <Route path='requests/followUp' element={<FollowUp />} />
                <Route path='requests/followUp/:rq_id' element={<FollowUpDetails />} />
                <Route path='requests/add' element={<AddRequestForm />} />


              </Route>
            </Route>

            <Route element={<StaffRoutes />}>
                <Route path = '/admin' element={<AdminLayout />}  exact >
                  <Route index element={<AdminPage />} />
                  <Route path='profile/update' element={<AdminProfile />} />
                  <Route path='profile' element={<ProfileCard />} />
                  <Route path='users' element={<Users />} />
                  <Route path='users/profile/:userid' element={<UserProfileCard />} />
                  <Route path='users/add' element ={<AddUser />} />
                  <Route path='users/update/:userid' element={<EditUser />} />
                  <Route path='requests' element={<Requests />} />
                  <Route path='requests/handle/:requestid/:userid/' element={<HandleSingleRequest />} />

               </Route>
            </Route>

            <Route element={<ManagersRoutes />}>
              <Route path='/manager' element={<ManagerLayout/>} exact>
                <Route index element={<ManagerPage />}/>
                <Route path='profile/update' element={<ManagerProfile />} />
                <Route path='profile' element={<ManagerProfileCard />} />

                <Route path='categories' element={<Categories />} />
                <Route path='categories/add' element ={<AddCategory />} />
                <Route path='categories/update/:categoryid' element={<EditCategory />} />

                <Route path='articles' element={<Articles />} />
                <Route path='articles/add' element ={<AddArticle />} />
                <Route path='articles/update/:articleid' element={<EditArticle />} />
              </Route>

            </Route>
            <Route path='*' element={<PageNotFound />} />
            <Route element={<LoginPage />} path="/login" />


          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
