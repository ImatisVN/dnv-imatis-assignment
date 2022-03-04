import { IObservableValue, observable } from "mobx";
import { StatusEnum } from "stores/enums/StatusEnum";

export const withStatus = () => {
  const status: IObservableValue<StatusEnum> = observable.box(StatusEnum.Idle);

  return {
    views: {
      get status() {
        return status.get() as StatusEnum;
      },
      set status(value: StatusEnum) {
        status.set(value);
      },
    },
    actions: {
      setStatus(value: StatusEnum) {
        status.set(value);
      },
    },
  };
};
