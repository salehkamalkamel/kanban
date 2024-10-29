import { useNavigate } from "react-router-dom";
import BodyText from "../ui/Bodytext";
import Button from "../ui/Button";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray3 flex flex-col items-center justify-center  gap-6 text-center h-[100vh]">
      <BodyText shape="bodyL" className="text-red1">
        No Page Founded.
      </BodyText>
      <BodyText shape="bodyM" className="text-gray1">
        Try refresh the page or inter a valid URL
      </BodyText>
      <Button onClick={() => navigate("/")} className="px-8">
        Go To Home Page
      </Button>
    </div>
  );
}
