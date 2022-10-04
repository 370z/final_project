import { Fragment, useState } from "react";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { Dialog, Menu, Listbox, Transition, Switch } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { instance, setContext } from "../../services/_Axios";
DeviceScan.layout = "Default";

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const user = {
  name: "Debbie Lewis",
  handle: "ESP8266_#989Ea16",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};
const people = [
  { id: 1, name: "Wade Cooper", online: true },
  { id: 2, name: "Arlene Mccoy", online: false },
  { id: 3, name: "Devon Webb", online: false },
  {
    id: 4,
    name: "ESP8266_#989Ea16  #MQTT 192.168.1.98 / A0:12:DA:DE:H0",
    online: true,
  },
  { id: 5, name: "Bed Room #01", online: false },
  { id: 6, name: "Hellen Schmidt", online: true },
  { id: 7, name: "Caroline Schultz", online: true },
  { id: 8, name: "Mason Heaney", online: false },
  { id: 9, name: "Claudie Smitham", online: true },
  { id: 10, name: "Emil Schaefer", online: false },
];

export default function DeviceScan({ results, userData }) {
  const scanDevice = async() => {
    setIsScan(true)
    try{
      const scanDevice = await instance.get("/device/scan")
      if(scanDevice){
        console.log(scanDevice);
        setIsScan(false)
      }
    }catch (err){
      setIsScan(false)
      console.log(err);
    }
  };
  // console.log("result====++++++", results.device)
  const [isScan, setIsScan] = useState(false);
  const { data: session } = useSession();
  const [availableToHire, setAvailableToHire] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [allowCommenting, setAllowCommenting] = useState(true);
  const [allowMentions, setAllowMentions] = useState(true);
  const [selected, setSelected] = useState(people[3]);
  const [roomSelected, setRoomSelected] = useState(people[4]);
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}

      <main className="flex-1 pb-8">
        <div className="mt-8">
          <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Device Details
          </h2>

          {/* Activity list (smallest breakpoint only) */}
          <div className="shadow sm:hidden">
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
            >
              {results.device.map((device) => (
                <li key={device._id}>
                  <a
                    href={device.name}
                    className="block px-4 py-4 bg-white hover:bg-gray-50"
                  >
                    <span className="flex items-center space-x-4">
                      <span className="flex-1 flex space-x-2 truncate">
                        <CashIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="flex flex-col text-gray-500 text-sm truncate">
                          <span className="truncate">{device.name}</span>
                          <span>
                            <span className="text-gray-900 font-medium">
                              {device.amount}
                            </span>{" "}
                            {device.currency}
                          </span>
                          <time dateTime={device.datetime}>{device.date}</time>
                        </span>
                      </span>
                      <ChevronRightIcon
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <nav
              className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
              aria-label="Pagination"
            >
              <div className="flex-1 flex justify-between">
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                >
                  Next
                </a>
              </div>
            </nav>
          </div>

          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <form
                    className="divide-y divide-gray-200 lg:col-span-9"
                    action="#"
                    method="POST"
                  >
                    {/* Profile section */}
                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                      <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">
                          Scan Device
                        </h2>
                        <div className="mt-1 text-sm text-gray-500">
                          <button
                            onClick={()=>{
                              scanDevice()
                            }}
                            className="mt-1 mb-1 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            disabled={isScan}
                          >
{isScan && (<svg
                              class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                              ></circle>
                              <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>)}
                            Scan
                          </button>
                          <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  Device List
                                </Listbox.Label>
                                <div className="mt-1 relative">
                                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <div className="flex items-center">
                                      <span
                                        aria-label={
                                          selected.online ? "Online" : "Offline"
                                        }
                                        className={classNames(
                                          selected.online
                                            ? "bg-green-400"
                                            : "bg-gray-200",
                                          "flex-shrink-0 inline-block h-2 w-2 rounded-full"
                                        )}
                                      />
                                      <span className="ml-3 block truncate">
                                        {selected.name}
                                      </span>
                                    </div>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                      {people.map((person) => (
                                        <Listbox.Option
                                          key={person.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-indigo-600"
                                                : "text-gray-900",
                                              "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={person}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <div className="flex items-center">
                                                <span
                                                  className={classNames(
                                                    person.online
                                                      ? "bg-green-400"
                                                      : "bg-gray-200",
                                                    "flex-shrink-0 inline-block h-2 w-2 rounded-full"
                                                  )}
                                                  aria-hidden="true"
                                                />
                                                <span
                                                  className={classNames(
                                                    selected
                                                      ? "font-semibold"
                                                      : "font-normal",
                                                    "ml-3 block truncate"
                                                  )}
                                                >
                                                  {person.name}
                                                  <span className="sr-only">
                                                    {" "}
                                                    is{" "}
                                                    {person.online
                                                      ? "online"
                                                      : "offline"}
                                                  </span>
                                                </span>
                                              </div>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-indigo-600",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col lg:flex-row">
                        <div className="flex-grow space-y-6">
                          <div>
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Device Name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm flex">
                              <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                                it.cmtc.ac.th/
                              </span>
                              <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                defaultValue={user.handle}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                defaultValue={""}
                              />
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              Brief description for your profile. URLs are
                              hyperlinked.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-6">
                          <Listbox
                            value={roomSelected}
                            onChange={setRoomSelected}
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  Assigned to
                                </Listbox.Label>
                                <div className="mt-1 relative">
                                  <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <div className="flex items-center">
                                      <span
                                        aria-label={
                                          roomSelected.online
                                            ? "Online"
                                            : "Offline"
                                        }
                                        className={classNames(
                                          roomSelected.online
                                            ? "bg-green-400"
                                            : "bg-gray-200",
                                          "flex-shrink-0 inline-block h-2 w-2 rounded-full"
                                        )}
                                      />
                                      <span className="ml-3 block truncate">
                                        {roomSelected.name}
                                      </span>
                                    </div>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                      {people.map((person) => (
                                        <Listbox.Option
                                          key={person.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-indigo-600"
                                                : "text-gray-900",
                                              "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={person}
                                        >
                                          {({ roomSelected, active }) => (
                                            <>
                                              <div className="flex items-center">
                                                <span
                                                  className={classNames(
                                                    person.online
                                                      ? "bg-green-400"
                                                      : "bg-gray-200",
                                                    "flex-shrink-0 inline-block h-2 w-2 rounded-full"
                                                  )}
                                                  aria-hidden="true"
                                                />
                                                <span
                                                  className={classNames(
                                                    roomSelected
                                                      ? "font-semibold"
                                                      : "font-normal",
                                                    "ml-3 block truncate"
                                                  )}
                                                >
                                                  {person.name}
                                                  <span className="sr-only">
                                                    {" "}
                                                    is{" "}
                                                    {person.online
                                                      ? "online"
                                                      : "offline"}
                                                  </span>
                                                </span>
                                              </div>

                                              {roomSelected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-indigo-600",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Room Detail
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Privacy section */}
                    <div className="pt-6 divide-y divide-gray-200">
                      <div className="px-4 sm:px-6">
                        <div>
                          <h2 className="text-lg leading-6 font-medium text-gray-900">
                            Enabled
                          </h2>
                          <div className="mt-1 text-sm text-gray-500">
                            Ornare eu a volutpat eget vulputate. Fringilla
                            commodo amet.
                          </div>
                        </div>
                        <ul
                          role="list"
                          className="mt-2 divide-y divide-gray-200"
                        >
                          <Switch.Group
                            as="li"
                            className="py-4 flex items-center justify-between"
                          >
                            <div className="flex flex-col">
                              <Switch.Label
                                as="p"
                                className="text-sm font-medium text-gray-900"
                                passive
                              >
                                Switch Mode or Analog Mode
                              </Switch.Label>
                              <Switch.Description className="text-sm text-gray-500">
                                Nulla amet tempus sit accumsan. Aliquet turpis
                                sed sit lacinia.
                              </Switch.Description>
                            </div>
                            <Switch
                              checked={availableToHire}
                              onChange={setAvailableToHire}
                              className={classNames(
                                availableToHire ? "bg-teal-500" : "bg-gray-200",
                                "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  availableToHire
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                              />
                            </Switch>
                          </Switch.Group>
                          <Switch.Group
                            as="li"
                            className="py-4 flex items-center justify-between"
                          >
                            <div className="flex flex-col">
                              <Switch.Label
                                as="p"
                                className="text-sm font-medium text-gray-900"
                                passive
                              >
                                Make private
                              </Switch.Label>
                              <Switch.Description className="text-sm text-gray-500">
                                Pharetra morbi dui mi mattis tellus sollicitudin
                                cursus pharetra.
                              </Switch.Description>
                            </div>
                            <Switch
                              checked={privateAccount}
                              onChange={setPrivateAccount}
                              className={classNames(
                                privateAccount ? "bg-teal-500" : "bg-gray-200",
                                "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  privateAccount
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                              />
                            </Switch>
                          </Switch.Group>
                          <Switch.Group
                            as="li"
                            className="py-4 flex items-center justify-between"
                          >
                            <div className="flex flex-col">
                              <Switch.Label
                                as="p"
                                className="text-sm font-medium text-gray-900"
                                passive
                              >
                                Allow commenting
                              </Switch.Label>
                              <Switch.Description className="text-sm text-gray-500">
                                Integer amet, nunc hendrerit adipiscing nam.
                                Elementum ame
                              </Switch.Description>
                            </div>
                            <Switch
                              checked={allowCommenting}
                              onChange={setAllowCommenting}
                              className={classNames(
                                allowCommenting ? "bg-teal-500" : "bg-gray-200",
                                "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  allowCommenting
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                              />
                            </Switch>
                          </Switch.Group>
                          <Switch.Group
                            as="li"
                            className="py-4 flex items-center justify-between"
                          >
                            <div className="flex flex-col">
                              <Switch.Label
                                as="p"
                                className="text-sm font-medium text-gray-900"
                                passive
                              >
                                Allow mentions
                              </Switch.Label>
                              <Switch.Description className="text-sm text-gray-500">
                                Adipiscing est venenatis enim molestie commodo
                                eu gravid
                              </Switch.Description>
                            </div>
                            <Switch
                              checked={allowMentions}
                              onChange={setAllowMentions}
                              className={classNames(
                                allowMentions ? "bg-teal-500" : "bg-gray-200",
                                "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  allowMentions
                                    ? "translate-x-5"
                                    : "translate-x-0",
                                  "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                              />
                            </Switch>
                          </Switch.Group>
                        </ul>
                      </div>
                      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                        <button
                          type="button"
                          className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  setContext(context);
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=http://localhost:3000/",
        permanent: false,
      },
    };
  }
  if (session?.user.accessToken) {
    const results = await instance.get("/devices/me");
    const results2 = await instance.get("/me");

    return {
      props: {
        componentName: "DeviceScan",
        session,
        results: results.data,
        userData: results2.data,
      },
    };
  }
}
