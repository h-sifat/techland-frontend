export interface Alert_Argument {
  message: string;
  type: "success" | "danger" | "info" | "warning";
}
export function Alert(arg: Alert_Argument) {
  const { message, type } = arg;
  return <div className={"alert alert-" + type}>{message} </div>;
}
