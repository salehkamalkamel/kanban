import CtrlPopup from "../../ui/CtrlPopup";
import Model from "../../ui/Model";
import DeleteTaskBtn from "./DeleteTaskBtn";
import DeleteTaskWindow from "./DeleteTaskWindow";
import EditTaskBtn from "./EditTaskBtn";

export default function TaskCtrlMenu({ columnId, taskId, onClose }) {
  return (
    <CtrlPopup onClose={onClose}>
      <Model>
        <Model.Toggle>
          <EditTaskBtn />
        </Model.Toggle>
      </Model>

      <Model>
        <Model.Toggle>
          <DeleteTaskBtn />
        </Model.Toggle>
        <Model.Window>
          <DeleteTaskWindow columnId={columnId} taskId={taskId} />
        </Model.Window>
      </Model>
    </CtrlPopup>
  );
}
