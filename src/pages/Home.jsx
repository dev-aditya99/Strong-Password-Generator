import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoCopyOutline } from "react-icons/io5";
import CommonLoader from "../components/loaders/CommonLoader";
import generatePassOrPin from "../utils/generatePassOrPin";

const Home = () => {
  // env variable
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // refs
  const toggleRef = useRef(null);

  // states
  const [isToggle, setIsToggle] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // functions
  const toggleHandler = (e) => {
    if (toggleRef.current.checked) {
      setIsToggle(true);
    } else {
      setIsToggle(false);
    }
  };

  //   generate
  // const generate = () => {
  //   setIsLoader(true);
  //   axios
  //     .post(BACKEND_URL + "/auth/generate-password", {
  //       toggleValue: isToggle,
  //     })
  //     .then((success) => {
  //       setInputValue(success.data);
  //       toast.success(
  //         isToggle
  //           ? "PIN Generated Successfully!"
  //           : "Password Generated Successfully!"
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.message);
  //     })
  //     .finally(() => {
  //       setIsLoader(false);
  //     });
  // };

  const generate = () => {
    try {
      setIsLoader(true);
      const response = generatePassOrPin(isToggle);
      setInputValue(response);
      toast.success(
        isToggle
          ? "PIN Generated Successfully!"
          : "Password Generated Successfully!"
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoader(false);
      copyPassword();
    }
  };

  //   copy password
  const copyPassword = () => {
    if (inputValue == "") {
      navigator.clipboard.writeText("Bhai pehale generate to karle!");
      toast.error("Bhai pehale generate to karle!");
    } else {
      navigator.clipboard.writeText(inputValue);
      toast.success("Copied!");
    }
  };

  return (
    <div className="min-[400px]:w-[400px] w-full flex items-center justify-center flex-col">
      {/* header  */}
      <header className="w-full py-4 text-purple-400 min-[400px]:text-2xl min-[300px]:text-xl text-lg font-bold border-b border-gray-200 shadow-sm flex items-center justify-center">
        <h2>Strong Password Generator</h2>
      </header>

      {/* main container  */}
      <div className="w-full py-3 px-2 flex items-center justify-center flex-col gap-2 relative">
        <div className="group w-full bg-purple-100 flex items-center justify-center gap-2 rounded-md">
          <input
            type="text"
            className="w-full py-3 px-3 bg-purple-100 text-gray-800 font-mono outline-none rounded-md placeholder-gray-500/50"
            id="password_screen"
            disabled
            autoFocus
            placeholder="Your Password or PIN"
            value={inputValue}
          />

          {/* copy btn  */}
          <button
            className="opacity-0 group-hover:opacity-100 p-2 translate-y-[50%] translate-x-[-50%] text-xl absolute top-0 right-0 text-purple-800 rounded-full hover:bg-purple-800 hover:text-purple-100 active:bg-purple-800/75 duration-200"
            onClick={copyPassword}
          >
            <IoCopyOutline />
          </button>
        </div>

        {/* toggle Password/PIN btn  */}
        <div className="w-full py-2 px-3 text-purple-300/50 flex items-center justify-between gap-2">
          {/* password  */}
          <span
            className={`tracking-wide ${
              isToggle ? "text-purple-300/50" : "text-purple-400 font-semibold"
            } duration-200`}
          >
            Password
          </span>

          {/* toggle btn  */}
          <label
            htmlFor="AcceptConditions"
            className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-purple-100 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-purple-400"
          >
            <input
              ref={toggleRef}
              className="peer sr-only"
              id="AcceptConditions"
              type="checkbox"
              onClick={toggleHandler}
            />
            <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
          </label>

          {/* PIN  */}
          <span
            className={`tracking-wide ${
              isToggle ? "text-purple-400 font-semibold" : "text-purple-300/50"
            } duration-200`}
          >
            PIN
          </span>
        </div>

        {/* Generate Password btn  */}
        <button
          className={`mt-3 w-full min-[400px]:py-4 py-3 px-2 text-center bg-purple-700 text-white text-lg tracking-wide font-bold rounded-md duration-200 flex items-center justify-center gap-2 ${
            isLoader
              ? "bg-purple-800/50"
              : "hover:bg-purple-800 active:bg-purple-800/50"
          }`}
          onClick={generate}
        >
          Generate
          {isLoader && <CommonLoader className={"p-2 "} />}
        </button>
      </div>
    </div>
  );
};

export default Home;
