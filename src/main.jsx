import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Allposts from './pages/Allposts.jsx'
import Editpost from './pages/Editpost.jsx'
import Addpost from './pages/Addpost.jsx'
import Loginn from './pages/Loginn.jsx'
import Signupp from './pages/Signupp.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'
import {Authlayout} from './components/index.js'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//         {
//             path: "/",
//             element: <Home />,
//         },
//         {
//             path: "/login",
//             element: (
//                 <Authlayout authentication={false}>
//                     <Login />
//                 </Authlayout>
//             ),
//         },
        // {
        //     path: "/signup",
        //     element: (
        //         <Authlayout authentication={false}>
        //             <Signup />
        //         </Authlayout>
        //     ),
        // },
        // {
        //     path: "/all-posts",
        //     element: (
        //         <Authlayout authentication>
        //             {" "}
        //             <Allposts />
        //         </Authlayout>
        //     ),
        // },
        // {
        //     path: "/add-post",
//             element: (
//                 <Authlayout authentication>
//                     {" "}
//                     <Addpost />
//                 </Authlayout>
//             ),
//         },
//         {
//             path: "/edit-post/:slug",
//             element: (
//                 <Authlayout authentication>
//                     {" "}
//                     <Editpost />
//                 </Authlayout>
//             ),
//         },
//         {
//             path: "/post/:slug",
//             element: <Post />,
//         },
//     ],
// },
// ])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={
        <Authlayout authentication={false}>
          <Loginn/>
        </Authlayout>
      }/>
      <Route path="/signup" element={
        <Authlayout authentication={false}>
          <Signupp/>
        </Authlayout>
      }/>
      <Route path='/all-posts' element={
        <Authlayout authentication>
          {" "}
          <Allposts/>
        </Authlayout>
      }/>
      <Route path='/add-post' element={
        <Authlayout authentication>
          {" "}
          <Addpost/>
        </Authlayout>
      }/>
      <Route path='/edit-post/:slug' element={
        <Authlayout authentication>
          {" "}
          <Editpost/>
        </Authlayout>
      }/>
      <Route path='/post/:slug' element={<Post/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
  </Provider>,
)
