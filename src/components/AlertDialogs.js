import React, { useContext, useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExpandCircleDown, QuestionMark } from "@mui/icons-material";

const AlertDialog = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [message, setMessage] = useState("");
  //close model
  const handelClose = () => {
    setOpen(false);
  };

  // browser error handler
  const handelErrorMessage = () => {
    // Detect browser
    let browser = "";

    const userAgent = navigator.userAgent.toLowerCase();
    const unsupportedBrowserSafari =
      "Unfortunately, Safari does not support the MetaMask extension, so You must utilize Chrome, Edge, Firefox, Brave, or other Chromium-based browsers in order to use MetaMask.";
    const mobileDevice =
      "Are you attempting to connect to MetaMask from a mobile device? MetaMask offers a mobile application called 'MetaMask Mobile' that is accessible on both iOS and Android platforms. You can utilize this app for your needs.";
    const MetaMaskNotEnabled =
      "Are you attempting to connect to the MetaMask wallet? Please ensure that you have the MetaMask extension installed. If not, consider installing it and then try connecting again.";
    const unsupportedBrowserUnknown =
      "Unfortunately, your browser does not support the MetaMask extension, so You must utilize Chrome, Edge, Firefox, Brave, or other Chromium-based browsers in order to use MetaMask.";
    const isMetaMaskEnabled = typeof window.ethereum !== "undefined";
    if (userAgent.indexOf("firefox") !== -1 && !isMetaMaskEnabled) {
      setMessage(MetaMaskNotEnabled);
      browser = "firefox";
      console.log(browser);
    } else if (userAgent.indexOf("chrome") !== -1 && !isMetaMaskEnabled) {
      setMessage(MetaMaskNotEnabled);
    } else if (userAgent.indexOf("safari") !== -1 && !isMetaMaskEnabled) {
      setMessage(unsupportedBrowserSafari);
      browser = "Safari";
      console.log(browser);
    } else if (
      (userAgent.indexOf("opera") !== -1 && !isMetaMaskEnabled) ||
      (userAgent.indexOf("opr") !== -1 && !isMetaMaskEnabled)
    ) {
      setMessage(unsupportedBrowserUnknown);
    } else {
      setMessage(unsupportedBrowserUnknown);
    }

    // Detect device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const isTablet = /iPad/i.test(userAgent);
    if (isMobile && !isMetaMaskEnabled) {
      setMessage(mobileDevice);
    } else if (isTablet && !isMetaMaskEnabled) {
      setMessage(mobileDevice);
    }
  };

  useEffect(() => {
    handelErrorMessage();
  }, []);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg profile-model mobile-model">
                  <div className="bg-white">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <QuestionMark
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className=" sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Attention
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">{message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AlertDialog;
