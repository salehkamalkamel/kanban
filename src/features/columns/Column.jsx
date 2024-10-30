import Heading from "../../ui/Heading";
import Model from "../../ui/Model";
import AddTaskBtn from "../tasks/AddTaskBtn";
import AddTaskWindow from "../tasks/AddTaskWindow";
import ViewTaskWindow from "../tasks/ViewTaskWindow";
import ColumnCard from "./ColumnCard";

export default function Column({ column }) {
  return (
    <div className="flex flex-col gap-2 w-72">
      <div className="flex items-center justify-between  rounded-md p-4">
        <Heading
          shape="s"
          level={4}
          className="uppercase  text-gray1 flex gap-2 justify-start items-center"
        >
          <div
            className={`w-4 h-4 rounded-full`}
            style={{ backgroundColor: column.columnColor }}
          />
          {`${column?.title?.toUpperCase()} (${column?.tasks?.length})`}
        </Heading>
        <Model>
          <Model.Toggle>
            <AddTaskBtn />
          </Model.Toggle>
          <Model.Window>
            <AddTaskWindow columnId={column?.id} />
          </Model.Window>
        </Model>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        {column?.tasks?.length > 0 ? (
          column?.tasks?.map((task, idx) => (
            <Model key={idx}>
              <Model.Toggle>
                <ColumnCard task={task} columnId={column.id} />
              </Model.Toggle>
              <Model.Window>
                <ViewTaskWindow task={task} columnId={column.id} />
              </Model.Window>
            </Model>
          ))
        ) : (
          <p className="max-w-[60%] text-gray1 font-bold text-sm text-center p-6">
            No Tasks Added To This Column Yet.
          </p>
        )}
      </div>
    </div>
  );
}
