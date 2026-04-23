import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashBoardLayout from "../Layout/MainLayout/DashBoardLayout";
import AddBooks from "../Pages/DashBoard/AddBooks/AddBooks";
import PrivateRoute from "./PrivateRoute";
import CovarageArea from "../Pages/Home/HomePage/CovarageArea/CovarageArea";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[{
        index:true,
        Component:Home
        
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
       loader:()=>fetch('/coverage.json').then(res=>res.json())

    }
    
  ]
  },

  {
    path:'dashboard',
   element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
   children:[{
    path:'add-books',
    element:<AddBooks></AddBooks>
   }]
   
  }
]);