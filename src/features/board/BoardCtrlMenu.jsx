import Model from "../../ui/Model";
import DeleteBoardBtn from "./DeleteBoardBtn";
import DeleteBoardMenu from "./DeleteBoardMenu";
import EditBoard from "./UpdateBoardWindow";
import EditBoardBtn from "./EditBoardBtn";
import CtrlPopup from "../../ui/CtrlPopup";

export default function BoardCtrlMenu({ onClose }) {
  return (
    <CtrlPopup onClose={onClose}>
      <Model>
        <Model.Toggle>
          <EditBoardBtn />
        </Model.Toggle>
        <Model.Window>
          <EditBoard />
        </Model.Window>
      </Model>
      <Model>
        <Model.Toggle>
          <DeleteBoardBtn />
        </Model.Toggle>
        <Model.Window>
          <DeleteBoardMenu />
        </Model.Window>
      </Model>
    </CtrlPopup>
  );
}
