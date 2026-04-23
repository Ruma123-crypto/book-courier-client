import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashBoardLayout from "../Layout/MainLayout/DashBoardLayout";
import AddBooks from "../Pages/DashBoard/AddBooks/AddBooks";
import PrivateRoute from "./PrivateRoute";
import CovarageArea from "../Pages/Home/HomePage/CovarageArea/CovarageArea";
import AllBooks from "../Pages/AllBooks/AllBooks";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import Payment from "../Pages/DashBoard/PaymentSuccess/PaymentSuccess";
import PaymentSuccess from "../Pages/DashBoard/PaymentSuccess/PaymentSuccess";
import MyProfile from "../Pages/DashBoard/MyProfiles/MyProfiles";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[{
        index:true,
        Component:Home,
         loader:()=>fetch('/coverage.json').then(res=>res.json())
        
    },
    {
      path:'login',
      Component:Login
    },
    {
      path:'register',
      Component:Register
    },
    {
      path:'covarage',
      element:<CovarageArea></CovarageArea>,
      

    },
    {
      path:'all-books',
      Component:AllBooks
    },
    {
      path:'view-details/:id',
      Component:ViewDetails
    }

    
  ]
  },

  {
    path:'dashboard',
   element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
   children:[{
    path:'add-books',
    element:<AddBooks></AddBooks>
   },
   {
    path:'my-orders',
    element:<MyOrders></MyOrders>
   },
   {
 path:'payment-success',
 element:<PaymentSuccess></PaymentSuccess>
},
{
  path:'my-profile',
  Component:MyProfile
}
  ]
   
  }
]);