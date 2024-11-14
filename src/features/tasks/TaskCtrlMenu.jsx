import CtrlPopup from "../../ui/CtrlPopup";
import Model from "../../ui/Model";
import DeleteTaskBtn from "./DeleteTaskBtn";
import DeleteTaskWindow from "./DeleteTaskWindow";
import EditTaskBtn from "./EditTaskBtn";
import EditTaskWindow from "./EditTaskWindow";

export default function TaskCtrlMenu({ task, columnId, onClose }) {
  return (
    <CtrlPopup onClose={onClose}>
      <Model>
        <Model.Toggle>
          <EditTaskBtn />
        </Model.Toggle>
        <Model.Window>
          <EditTaskWindow task={task} columnId={columnId} />
        </Model.Window>
      </Model>

      <Model>
        <Model.Toggle>
          <DeleteTaskBtn />
        </Model.Toggle>
        <Model.Window>
          <DeleteTaskWindow columnId={columnId} task={task} />
        </Model.Window>
      </Model>
    </CtrlPopup>
  );
}
