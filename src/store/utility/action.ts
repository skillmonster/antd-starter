import {
  Action,
  ActionModal,
  ActionModalDialog,
  ActionNotification,
  ActionSuccess,
} from './types';

export const handleError = (action: Action) => {
  return {
    ...action,
  };
};

export const handleSuccess = (action: ActionSuccess) => {
  return { ...action };
};

export const handleModalDialog = (action: ActionModalDialog) => {
  return { ...action };
};

export const handleModalNotification = (action: ActionNotification) => {
  return { ...action };
};

export const handleModal = (action: ActionModal) => {
  return { ...action };
};
