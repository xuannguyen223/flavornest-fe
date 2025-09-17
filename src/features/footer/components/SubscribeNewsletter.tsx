export default function SubscribeNewsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // chặn reload lại trang khi submit
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Subscribed email:", email);
    // TODO: call API
  };

  return (
    <div className="w-full max-w-[400px]">
      {/* Title */}
      <h2 className="text-neutral-700 text-3xl font-semibold mb-2 leading-tight font-cormorant">
        Sign up for our Newsletter
      </h2>

      {/* Subtitle */}
      <p className="text-neutral-700 text-lg leading-9 mb-2 font-poppins">
        Subscribe & start receiving your weekly dose of delicious inspiration!
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full h-[50px] bg-white rounded-[46px] border border-white overflow-hidden"
      >
        <input
          type="email"
          name="email"
          placeholder="name@domain.com"
          className="flex-1 px-7 text-left text-gray-500 placeholder-gray-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-neutral-700 text-white flex items-center justify-center 
          hover:bg-neutral-500 transition-colors rounded-r-[46px] 
          font-poppins font-semibold text-lg w-1/3 h-full"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}
