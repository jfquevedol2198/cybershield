import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <main id="content" className="mx-auto">
        <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
          <h1 className="text-primary dark:text-primary block text-9xl font-bold">
            404
          </h1>
          <p className="mt-3 text-2xl font-bold text-gray-800 dark:text-white">
            Oops, something went wrong.
          </p>
          <p className="dark:text-white/70 text-gray-600">
            Sorry, we couldn&apos;t find your page.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <Link
              className="bg-primary focus:ring-primary dark:focus:ring-offset-white/10 inline-flex w-full items-center justify-center gap-x-3 rounded-sm border border-transparent px-3 py-2 text-center text-sm font-medium text-primary-4 transition hover:bg-primary-4 hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white sm:w-auto"
              to="/"
            >
              <i className="ri-arrow-left-line"></i>
              Get Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error404;
