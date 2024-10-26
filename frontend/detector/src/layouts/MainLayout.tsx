import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';
export interface OrderData {
  "Date Ordered": string;
  Month: number;
  "Product Name": string;
  "Product Price": number;
  "Quantity Ordered": number;
  Total: number;
  Week: string;
  Year: number;
}
interface SalesData {
  "Date Ordered": string;
  "Product Name": string;
  "Product Price": number;
  "Quantity Ordered": number;
  Total: number;
}
interface ItemsData {
  "Product": string;
  "Price": number;
}
export interface users{
    "user_id": number;
    "email":string;
    "password":string;
    "username":string;
    "role":string
}
export interface devices{
  "device_id": number;
  "device_name":string;
  "status":string;
  "created_by":string;
  "created_at":string
}
export interface OutletContextType {
  setIsLoading: (loading: boolean) => void;
  setUser:React.Dispatch<React.SetStateAction<users>>
  user:users;
  importData: OrderData[];
  setImportData: React.Dispatch<React.SetStateAction<OrderData[]>>;
  importItemsData: ItemsData[];
  setImportItemsData: React.Dispatch<React.SetStateAction<ItemsData[]>>;
  importSalesData: SalesData[];
  setImportSalesData: React.Dispatch<React.SetStateAction<SalesData[]>>;
}


export const MainLayout = () => {
  const navigate = useNavigate()
  const hostServer = import.meta.env.VITE_SERVER_HOST
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    authCheck()
  },[])
  const authCheck = async () => {
    try {
      setIsLoading(true)
      const res = (await axios.get(`${hostServer}/homeAuthentication`)).data
      console.log(res.authData)
      if(res.authData){
        setUser(res.authData.user[0])
      }else{
        navigate("/login")
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  } 
  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`${hostServer}/logout`)
      if(res.data.success){
        console.log(res.data)
        navigate("/login")
      }
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error)
      throw(error)
    }
  }

  const [importData, setImportData] = useState<OrderData[]>([]); // Initialize as empty
  const [importSalesData, setImportSalesData] = useState<SalesData[]>([])
  const [importItemsData, setImportItemsData] = useState<ItemsData[]>([])
  const [breadCrumb, setBreadCrumb] = useState("Dashboard");

  return (
    <>
      <>

      {isLoading &&
      <>
        <div className="loader z-[101] h-lvh w-lvw fixed flex items-center justify-center opacity-50">
          <FadeLoader color="#2563eb" />
        </div>
      <div className='h-lvh w-lvw z-[100] opacity-50 fixed top-0 bg-neutral-600'></div>
      </>
      }
        {/* ========== MAIN CONTENT ========== */}
        {/* Breadcrumb */}
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center py-2">
            {/* Navigation Toggle */}
            <button
              type="button"
              className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width={18} height={18} x={3} y={3} rx={2} />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>
            {/* End Navigation Toggle */}
            {/* Breadcrumb */}
            <ol className="ms-3 flex items-center whitespace-nowrap">
              {/* <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                Application Layout

              </li> */}
              {
                breadCrumb && breadCrumb == "Dashboard"? 
                <>
              <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Dashboard
              </li>
                </>: breadCrumb == "Sales" ? 
                <>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Devices
              </li>
                              <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                List of devices
              </li>
                </>
                :
                <>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Users
              </li>
                              <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                List of accounts
              </li>
                </>
              }

            </ol>
            {/* End Breadcrumb */}
          </div>
        </div>
        {/* End Breadcrumb */}
        {/* Sidebar */}
        <div
          id="hs-application-sidebar"
          className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
  dark:bg-neutral-800 dark:border-neutral-700"
          role="dialog"
          tabIndex={-1}
          aria-label="Sidebar"
        >
          <div className="relative flex flex-col h-full max-h-full">
            <div className="px-6 pt-4">
              {/* Logo */}
              <Link
                className="flex justify-center items-center gap-5 rounded-xl text-xl font-semibold"
                to="/"
                onClick={()=>{setBreadCrumb("Dashboard")}}
                aria-label="Preline"
              >
                <img src="/logo.jpg" alt="Logo" className='object-contain w-12 h-12' />
                <p className='text-md'>Security Home System</p>
              </Link>
              {/* End Logo */}
            </div>
            {/* Content */}
            <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <nav
                className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open=""
              >
                <ul className="flex flex-col space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/"
                      onClick={()=>{setBreadCrumb("Dashboard")}}
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>

                  <li className="hs-accordion" id="account-accordion">
                    <button
                      type="button"
                      className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      aria-expanded="true"
                      aria-controls="account-accordion-child"
                    >

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="shrink-0 mt-0.5 size-4" >
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      d="M22.0001 10C22.0001 6.22876 22.0001 4.34315 20.8285 3.17157C19.657 2 17.7713 2 14.0001 2C10.2289 2 8.34324 2 7.17167 3.17157C6.22859 4.11466 6.04466 5.52043 6.00879 8M22.0001 14C22.0001 17.7712 22.0001 19.6569 20.8285 20.8284C19.657 22 17.7713 22 14.0001 22H12"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
    />{" "}
    <path
      d="M2 14.5C2 13.0955 2 12.3933 2.33706 11.8889C2.48298 11.6705 2.67048 11.483 2.88886 11.3371C3.39331 11 4.09554 11 5.5 11C6.90446 11 7.60669 11 8.11114 11.3371C8.32952 11.483 8.51702 11.6705 8.66294 11.8889C9 12.3933 9 13.0955 9 14.5V18.5C9 19.9045 9 20.6067 8.66294 21.1111C8.51702 21.3295 8.32952 21.517 8.11114 21.6629C7.60669 22 6.90446 22 5.5 22C4.09554 22 3.39331 22 2.88886 21.6629C2.67048 21.517 2.48298 21.3295 2.33706 21.1111C2 20.6067 2 19.9045 2 18.5V14.5Z"
      stroke="#1f2937"
      strokeWidth="1.5"
    />{" "}
    <path
      d="M17 19H12"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
    />{" "}
  </g>
</svg>

                      Devices
                      <svg
                        className="hs-accordion-active:block ms-auto hidden size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:hidden ms-auto block size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    <div
                      id="account-accordion-child"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                      role="region"
                      aria-labelledby="account-accordion"
                    >
                      <ul className="ps-8 pt-1 space-y-1">
                        <li>

                          <Link
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                            to="devices/view"
                            onClick={()=>{setBreadCrumb("Sales")}}
                          >
                            {/* <svg
                              fill="#1f2937"
                              height="15"
                              width="15"
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 512 512"
                              xmlSpace="preserve"
                              stroke="#1f2937"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M226.133,469.333H55.467V409.6c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v68.267 c0,4.71,3.823,8.533,8.533,8.533h179.2c4.71,0,8.533-3.823,8.533-8.533S230.844,469.333,226.133,469.333z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M46.933,366.933c-4.71,0-8.533,3.823-8.533,8.533S42.223,384,46.933,384h0.085c4.71,0,8.491-3.823,8.491-8.533 S51.644,366.933,46.933,366.933z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M394.3,139.034L257.766,2.5c-1.596-1.604-3.772-2.5-6.033-2.5h-204.8C42.223,0,38.4,3.823,38.4,8.533v332.8 c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V17.067H243.2v128c0,4.71,3.823,8.533,8.533,8.533h128v76.8 c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-85.333C396.8,142.805,395.904,140.629,394.3,139.034z M260.267,136.533 V29.133l107.401,107.401H260.267z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M345.6,256c-70.579,0-128,57.421-128,128s57.421,128,128,128s128-57.421,128-128S416.179,256,345.6,256z M345.6,494.933 c-61.167,0-110.933-49.766-110.933-110.933S284.433,273.067,345.6,273.067S456.533,322.833,456.533,384 S406.767,494.933,345.6,494.933z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M429.286,378.957c-22.272-31.138-51.994-48.29-83.686-48.29s-61.406,17.143-83.678,48.29 c-2.005,2.807-2.125,6.682-0.324,9.626c21.709,35.319,51.132,54.904,82.859,55.151c0.205,0,0.41,0,0.614,0 c31.872,0,61.841-19.524,84.454-55.04C431.411,385.741,431.317,381.798,429.286,378.957z M345.6,349.867 c9.395,0,17.032,7.637,17.032,17.033c0,9.395-7.637,17.033-17.032,17.033c-9.395,0-17.033-7.646-17.033-17.033 S336.205,349.867,345.6,349.867z M410.01,387.081c-18.526,25.626-41.327,39.586-64.947,39.586c-0.162,0-0.316,0-0.469,0 c-23.424-0.188-45.747-14.148-63.556-39.543c-1.109-1.587-1.033-3.84,0.205-5.333c8.678-10.513,18.398-18.662,28.732-24.38 c1.271-0.7,2.825,0.495,2.483,1.911c-1.988,8.09-1.237,17.212,6.016,27.341c3.866,5.402,9.054,9.668,15.275,12.006 c23.748,8.917,45.986-9.088,45.986-31.735c0-3.115-0.768-5.291-1.348-7.893c-0.307-1.374,1.289-2.483,2.526-1.809 c10.411,5.7,20.19,13.858,28.937,24.422C411.102,383.181,411.17,385.476,410.01,387.081z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg> */}

                            List of devices
                          </Link>
                          <Link    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                          
                          onClick={()=>{setBreadCrumb("Items")}}to="/devices/edit">
                        Edit devices
                        </Link>
                        </li>
                        {/* <li>
                          <Link
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                            to="sales/create"
                          >
                            <svg
                              height={15}
                              width={15}
                              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                  stroke="#1f2937"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M17 15V18M17 21V18M17 18H14M17 18H20"
                                  stroke="#1f2937"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                              </g>
                            </svg>
                            Create
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>
                  <li className="hs-accordion" id="account-accordion">
                    <button
                      type="button"
                      className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      aria-expanded="true"
                      aria-controls="account-accordion-child"
                    >

                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5 size-4" width={24} height={24}>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      d="M10.1992 12C12.9606 12 15.1992 9.76142 15.1992 7C15.1992 4.23858 12.9606 2 10.1992 2C7.43779 2 5.19922 4.23858 5.19922 7C5.19922 9.76142 7.43779 12 10.1992 12Z"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M1 22C1.57038 20.0332 2.74795 18.2971 4.36438 17.0399C5.98081 15.7827 7.95335 15.0687 10 15C14.12 15 17.63 17.91 19 22"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M17.8205 4.44006C18.5822 4.83059 19.1986 5.45518 19.579 6.22205C19.9594 6.98891 20.0838 7.85753 19.9338 8.70032C19.7838 9.5431 19.3674 10.3155 18.7458 10.9041C18.1243 11.4926 17.3302 11.8662 16.4805 11.97"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M17.3203 14.5701C18.6543 14.91 19.8779 15.5883 20.8729 16.5396C21.868 17.4908 22.6007 18.6827 23.0003 20"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
  </g>
</svg>


                      Users
                      <svg
                        className="hs-accordion-active:block ms-auto hidden size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:hidden ms-auto block size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    <div
                      id="account-accordion-child"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                      role="region"
                      aria-labelledby="account-accordion"
                    >
                      <ul className="ps-8 pt-1 space-y-1">
                        <li>
                          <Link
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                            to="users/view"
                            onClick={()=>{setBreadCrumb("Items")}}
                          >
                            {/* <svg
                              fill="#1f2937"
                              height="15"
                              width="15"
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 512 512"
                              xmlSpace="preserve"
                              stroke="#1f2937"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M226.133,469.333H55.467V409.6c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v68.267 c0,4.71,3.823,8.533,8.533,8.533h179.2c4.71,0,8.533-3.823,8.533-8.533S230.844,469.333,226.133,469.333z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M46.933,366.933c-4.71,0-8.533,3.823-8.533,8.533S42.223,384,46.933,384h0.085c4.71,0,8.491-3.823,8.491-8.533 S51.644,366.933,46.933,366.933z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M394.3,139.034L257.766,2.5c-1.596-1.604-3.772-2.5-6.033-2.5h-204.8C42.223,0,38.4,3.823,38.4,8.533v332.8 c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V17.067H243.2v128c0,4.71,3.823,8.533,8.533,8.533h128v76.8 c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-85.333C396.8,142.805,395.904,140.629,394.3,139.034z M260.267,136.533 V29.133l107.401,107.401H260.267z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M345.6,256c-70.579,0-128,57.421-128,128s57.421,128,128,128s128-57.421,128-128S416.179,256,345.6,256z M345.6,494.933 c-61.167,0-110.933-49.766-110.933-110.933S284.433,273.067,345.6,273.067S456.533,322.833,456.533,384 S406.767,494.933,345.6,494.933z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M429.286,378.957c-22.272-31.138-51.994-48.29-83.686-48.29s-61.406,17.143-83.678,48.29 c-2.005,2.807-2.125,6.682-0.324,9.626c21.709,35.319,51.132,54.904,82.859,55.151c0.205,0,0.41,0,0.614,0 c31.872,0,61.841-19.524,84.454-55.04C431.411,385.741,431.317,381.798,429.286,378.957z M345.6,349.867 c9.395,0,17.032,7.637,17.032,17.033c0,9.395-7.637,17.033-17.032,17.033c-9.395,0-17.033-7.646-17.033-17.033 S336.205,349.867,345.6,349.867z M410.01,387.081c-18.526,25.626-41.327,39.586-64.947,39.586c-0.162,0-0.316,0-0.469,0 c-23.424-0.188-45.747-14.148-63.556-39.543c-1.109-1.587-1.033-3.84,0.205-5.333c8.678-10.513,18.398-18.662,28.732-24.38 c1.271-0.7,2.825,0.495,2.483,1.911c-1.988,8.09-1.237,17.212,6.016,27.341c3.866,5.402,9.054,9.668,15.275,12.006 c23.748,8.917,45.986-9.088,45.986-31.735c0-3.115-0.768-5.291-1.348-7.893c-0.307-1.374,1.289-2.483,2.526-1.809 c10.411,5.7,20.19,13.858,28.937,24.422C411.102,383.181,411.17,385.476,410.01,387.081z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg> */}
                            List of accounts 
                          </Link>
                          <Link    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                          
                            onClick={()=>{setBreadCrumb("Items")}}to="/users/edit">
                          Edit accounts
                          </Link>
                        </li>
                        {/* <li>


                          <Link
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                            to="items/create"
                          >
                            <svg
                              height={15}
                              width={15}
                              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                  stroke="#1f2937"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M17 15V18M17 21V18M17 18H14M17 18H20"
                                  stroke="#1f2937"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                              </g>
                            </svg>
                            Create
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      href="#"
                      onClick={handleLogout}
                    >

                      <svg
                        fill="#B91c1c"
                        viewBox="0 0 32 32"
                        version="1.1"
                        className="shrink-0 mt-0.5 size-4" width={24} height={24}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z" />{" "}
                        </g>
                      </svg>


                      <span className='text-red-700'>
                        Logout</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {/* End Content */}
          </div>
        </div>
        {/* End Sidebar */}
        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:ps-[16rem] lg:pt-0 lg:pr-0">
          <Outlet context={{setIsLoading,user, importData, setImportData, importItemsData, setImportItemsData, importSalesData, setImportSalesData }} />
        </div>
        {/* End Content */}
        {/* ========== END MAIN CONTENT ========== */}
      </>

    </>
  )

}