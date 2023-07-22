import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <>
      <div className="h-screen w-screen flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.
            </p>
            <p className="mb-8">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>

            <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">

              <Link to="/">
              back to homepage
                  </Link>
            </button>
          </div>
          <div className="max-w-lg">
          <img src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689342595/3804935_cupiun.jpg" alt="Error" />

            {/* <img src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689339982/96984_ywnlwf.jpg" alt="Error" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
