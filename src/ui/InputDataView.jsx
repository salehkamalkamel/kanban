import { RxCross1 } from "react-icons/rx";
import SmColorPicker from "./SmColorPicker";

export default function InputDataView({
  data = [],
  dataType,
  handleItemChange,
  handleDeleteItem,
  handleColomnColor = null,
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      {data.length > 0 ? (
        data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 w-full">
            {dataType === "Column" && (
              <SmColorPicker
                value={item?.columnColor}
                onChange={(e) => handleColomnColor(idx, e.target.value)}
              />
            )}
            <input
              required
              defaultValue={item.title || ""}
              onChange={(e) => handleItemChange(idx, e.target.value)}
              className="flex-1 h-10 px-4 placeholder:text-gray1 rounded-md border border-gray2 bg-transparent font-medium text-[0.8125rem] leading-6 text-black dark:text-white outline-none"
              type="text"
              placeholder={`${dataType} ${idx + 1}`}
            />
            <button
              onClick={() => handleDeleteItem(idx)}
              type="button"
              className="text-gray1 dark:text-white"
            >
              <RxCross1 size="1rem" />
            </button>
          </div>
        ))
      ) : (
        <p className="w-full text-center font-bold text-gray1 text-sm">
          {`No ${dataType}s Added`}
        </p>
      )}
    </div>
  );
}
