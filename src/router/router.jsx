import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashBoardLayout from "../Layout/MainLayout/DashBoardLayout";

import PrivateRoute from "./PrivateRoute";
import CovarageArea from "../Pages/Home/HomePage/CovarageArea/CovarageArea";
import AllBooks from "../Pages/AllBooks/AllBooks";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import Payment from "../Pages/DashBoard/PaymentSuccess/PaymentSuccess";
import PaymentSuccess from "../Pages/DashBoard/PaymentSuccess/PaymentSuccess";
import MyProfile from "../Pages/DashBoard/MyProfiles/MyProfiles";
import Invoices from "../Pages/DashBoard/Invoices/Invoices";
import PaymentCancel from "../Pages/DashBoard/PaymentCancel/PaymentCancel";
import LaybariyanDashBoard from "../Pages/LaybariyanDashBoard/LaybariyanDashBoard";
import AddBooks from "../Pages/DashBoard/AddBooks/AddBooks";
import MyBooks from "../Pages/LaybariyanDashBoard/MyBooks/MyBooks";
import EditBook from "../Pages/LaybariyanDashBoard/EditBook/EditBook";
import Orders from "../Pages/LaybariyanDashBoard/Orders/Orders";
import AdminDashBoard from "../Pages/AdminDashBoard/AdminDashBoard";
import AllUsers from "../Pages/AdminDashBoard/AllUser";

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
   children:[
   {
    path:'my-orders',
    element:<MyOrders></MyOrders>
   },
   {
 path:'payment-success',
 element:<PaymentSuccess></PaymentSuccess>
},
{
path:'payment-cancel',
element:<PaymentCancel></PaymentCancel>
},
{
  path:'my-profile',
  Component:MyProfile
},
{
  path:'invoices',
  Component:Invoices
}
  ]
   
  },
  {
    path:'lbdashboard',
    element:<PrivateRoute><LaybariyanDashBoard></LaybariyanDashBoard></PrivateRoute>,
    children:[
     {
    path:'add-books',
    element:<AddBooks></AddBooks>
   },
    {
    path:'my-books',
    element:<MyBooks></MyBooks>
    },
    {
      path:'edit-book/:id',
      element:<EditBook></EditBook>
    },
    {
      path:'orders',
      element:<Orders></Orders>
    }
    ]


  },
  {
    path:'admindashboard',
    element:<PrivateRoute><AdminDashBoard></AdminDashBoard></PrivateRoute>,
    children:[
      {
        path:'all-users',
        element:<AllUsers></AllUsers>
      }
    ]
  }

]);