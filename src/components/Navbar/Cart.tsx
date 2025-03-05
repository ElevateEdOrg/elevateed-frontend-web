import { RootState } from "@/redux/store";
import { IoMdCart, IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { clearCart, removeFromCart } from "@/redux/slices/cartSlice";
import { makePayment } from "@/api/courseService";
import { DefaultCourseBanner1 } from "@/assets";

export const Cart = () => {
  const state = useSelector((state: RootState) => state);
  const cart = state.cart;
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setModal(true);
  };

  const handlePayment = async () => {
    const courseIdArray = cart.courses.map((course) => course.id);
    console.log("Clicked:", courseIdArray);
    try {
      const response = await makePayment(courseIdArray);
      console.log(response);
      // Redirect to response.data.data
      window.location.href = response.data.data;
    } catch (error) {
      console.log("Error processing payment...", error);
    }
  };

  return (
    <>
      <Button
        className="p-2 hover:bg-gray-200 font-semibold rounded-full text-xs md:text-base"
        onClick={handleClick}
      >
        <IoMdCart />
        <span>Cart</span>
      </Button>
      {modal && (
        <section className="fixed w-screen h-screen bg-black/30 z-50 top-0 left-0 flex px-5 py-4 xl:px-44 xl:py-30 ">
          <article className="bg-white px-10 py-14 rounded-3xl w-full h-full relative flex flex-col">
            <IoMdClose
              onClick={() => setModal(false)}
              className="text-xl absolute top-4 cursor-pointer right-4"
            />
            <div className=" flex grow flex-col gap-4 overflow-y-auto">
              {cart.courses.length === 0 ? (
                <p className="text-xl xl:text-3xl w-full h-full flex items-center justify-center text-center">
                  You haven't added any courses to the cart
                </p>
              ) : (
                cart.courses.map((course) => (
                  <div
                    className=" flex flex-col xl:flex-row gap-4"
                    key={course.id}
                  >
                    <div className="h-full xl:w-1/5">
                      <img src={course.banner_image||DefaultCourseBanner1} alt="" />
                    </div>
                    <div className="h-full xl:w-3/5">
                      <h1 className="font-bold">{course.title}</h1>
                      <p className="text-sm line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    <div className="h-full xl:w-1/5 relative">
                      <p className="font-bold flex gap-2 items-center">
                        <FaRupeeSign />
                        {course.price}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromCart(course.id!))}
                        className="bg-red-500 px-4 h-5 text-xs text-white flex items-center justify-center  rounded-full cursor-pointer absolute top-0 right-0"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="h-10 flex items-center justify-between">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-black/90 text-white text-xs whitespace-nowrap px-4 py-2 rounded-full cursor-pointer"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePayment}
                className="bg-brand-primary  text-xs whitespace-nowrap text-white px-4 py-2 rounded-full cursor-pointer"
              >
                Purchase these courses
              </button>
            </div>
          </article>
        </section>
      )}
    </>
  );
};
