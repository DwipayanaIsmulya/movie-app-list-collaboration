// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Protected = () => {
//     const navigate = useNavigate();


//     useEffect(() => {
//         const getMe = async () => {
//             try{
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     return  navigate("/login");
//                 }

//                 await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`)
//             }
//         }
//     })

//   return (
//     <div>Protected</div>
//   )
// }

// export default Protected