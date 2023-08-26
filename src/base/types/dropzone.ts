// material-ui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

//third-party
import { DropzoneOptions } from 'react-dropzone';
import { TypeExtensionNode } from 'graphql';

// ==============================|| TYPES - DROPZONE  ||============================== //

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  acceptedImage?: boolean;
  file: CustomFile[] | null;
  setFieldValue: (field: string, value: any) => void;
  sx?: SxProps<Theme>;
  simplePlaceholder?: boolean;
}

export interface MIMEType {
  type: string;
  subtype: string;
  extensions: string[];
}
export interface UploadMultiFileProps extends DropzoneOptions {
  files?: CustomFile[] | null;
  error?: boolean;
  showList?: boolean;
  autoUpload?: boolean;
  sx?: SxProps<Theme>;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  setFieldValue: (field: string, value: any) => void;
  simplePlaceholder?: boolean;
  allowExtensions?: MIMEType[];
}

export interface FilePreviewProps {
  showList?: boolean;
  files: (File | string)[];
  onRemove?: (file: File | string) => void;
}

export interface UploadFileProgress {
  file: File;
  percentCompleted: number;
  uploadId: string;
  bucket: string;
  stopped: boolean;
}
export interface FileUploadProgressProps {
  uploadFiles: UploadFileProgress[];
  handleDeleteFile?: (files: any) => void;
  startUpload?: boolean;
}
