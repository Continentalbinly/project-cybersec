function Error() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-400 dark:text-white">Page Not Found</h1>
        <p className="mt-4 dark:text-white text-black">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </>
  );
}

export default Error;
