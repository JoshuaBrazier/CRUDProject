import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-pink-300 fixed top-0 left-0 right-0 w-[100%]">
        <ul className="list-none flex flex-wrap justify-evenly align-middle">
          <li className="bg-cyan-500 rounded-full hover:bg-green-500 p-2 w-[200px] text-center m-5">
            <Link to="/">Home</Link>
          </li>
          <li className="bg-cyan-500 rounded-full hover:bg-green-500 p-2 w-[200px] text-center m-5">
            <Link to="/todo">Todo</Link>
          </li>
          <li className="bg-cyan-500 rounded-full hover:bg-green-500 p-2 w-[200px] text-center m-5">
            <Link to="/weather">Weather</Link>
          </li>
        </ul>
      </nav>
      <main>
        <div className='pt-[80px]'>
          <Outlet />
        </div>
      </main>
    </>
  )
};

export default Layout;
