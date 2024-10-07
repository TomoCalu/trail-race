import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="container mx-auto p-4 max-w-screen-lg">
        <div className="bg-base-100 shadow-lg rounded-lg mb-8 p-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-8">
            Sorry, an unexpected error has occurred.
          </h2>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
