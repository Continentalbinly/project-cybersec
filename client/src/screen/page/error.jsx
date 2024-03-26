function Error() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-300">Page Not Found</h1>
        <p className="text-gray-200 mt-4">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </>
  );
}

export default Error;
