export type StatusType = 'ACTIVE' | 'INACTIVE';
export interface IError {
  status: boolean;
  name: string;
}

export interface ErrorState {
  readonly status: boolean;
  readonly name: string;
}
export type ActionError = { SET_ERROR: IError };

export interface IErrorState {
  error: IError;
}
export type ActionMap = ActionError;
export type Action<K extends keyof ActionMap = keyof ActionMap> = {
  [P in K]: {
    type: K;
    payload: ActionMap[K];
  };
}[K];

export interface ISuccess extends IError {}
export interface SuccessState {
  readonly status: boolean;
  readonly name: string;
}
export type ActionSuccessMap = { SET_SUCCESS: ISuccess };
export type ActionSuccess<
  K extends keyof ActionSuccessMap = keyof ActionSuccessMap
> = {
  [P in K]: {
    type: K;
    payload: ActionSuccessMap[K];
  };
}[K];

export type ModalDialogIcon = 'error' | 'warning' | 'success' | 'info';
export interface ModalDialog {
  icon: ModalDialogIcon;
  message: string;
  description?: string;
}
export interface ModalDialogState {
  readonly show: boolean;
  readonly data: ModalDialog;
}

export type ActionModalDialogMap = {
  OPEN_MODAL_DIALOG: ModalDialog;
  CLOSE_MODAL_DIALOG: ModalDialog;
};
export type ActionModalDialog<
  K extends keyof ActionModalDialogMap = keyof ActionModalDialogMap
> = {
  [P in K]: {
    type: K;
    payload: ActionModalDialogMap[K];
  };
}[K];

export type NotificationIcon = 'success' | 'info' | 'warning' | 'error';
export interface Notification {
  icon: NotificationIcon;
  message: string;
  description?: string;
}
export interface NotificationState {
  readonly show: boolean;
  readonly data: Notification;
}

export type ActionNotificationMap = { OPEN_NOTIFICATION: Notification };
export type ActionNotification<
  K extends keyof ActionNotificationMap = keyof ActionNotificationMap
> = {
  [P in K]: {
    type: K;
    payload: ActionNotificationMap[K];
  };
}[K];

export interface ModalState<T> {
  open: boolean;
  modal_name: string;
  data?: T;
}
export interface ActionModalData {
  data: any;
  modal_name: string;
}

export type ActionModalMap = {
  OPEN_MODAL: ActionModalData;
  CLOSE_MODAL: ActionModalData;
};

export type ActionModal<K extends keyof ActionModalMap = keyof ActionModalMap> =
  {
    [P in K]: {
      type: K;
      payload: ActionModalMap[K];
    };
  }[K];
