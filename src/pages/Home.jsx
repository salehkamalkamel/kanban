import { useState } from "react";
import Header from "../features/home/Header";
import SideBar from "../features/home/SideBar";
import Main from "../features/main/Main";
import BodyText from "../ui/Bodytext";
import { useGetData } from "../hooks/useGetData";

export default function Home() {
  const [showSideBar, setShowSideBar] = useState(false);
  const { data, isLoading, error } = useGetData("all");

  function handleToggleSideBar() {
    setShowSideBar((state) => !state);
  }

  function handleHide() {
    setShowSideBar(false);
  }

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-[100vh] flex  items-center justify-center bg-gray3 dark:bg-black3">
  //       <div className="flex items-center justify-center gap-4">
  //         <LoadingSpinner />
  //         <BodyText shape="bodyL" className="text-gray1 w-max ">
  //           Getting User Data....
  //         </BodyText>
  //       </div>
  //     </div>
  //   );
  // }

  if (!isLoading && (!data || error)) {
    return (
      <div className="bg-gray3 flex flex-col items-center justify-center  gap-6 text-center h-[100vh]">
        <BodyText shape="bodyL" className="text-red1">
          Feild To Load Data.
        </BodyText>
        <BodyText shape="bodyM" className="text-gray1">
          {error?.message}
        </BodyText>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
      <div className="col-span-2">
        <Header
          handleToggleSideBar={handleToggleSideBar}
          data={data?.data}
          isLoading={isLoading}
        />
      </div>
      <div className="h-full">
        <SideBar
          isLoading={isLoading}
          show={showSideBar}
          handleSetShow={handleHide}
          data={data?.data}
        />
      </div>
      <Main />
    </div>
  );
}
