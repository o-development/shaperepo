import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

interface CopyToClipboardProps {
  copyValue: string;
}

const CopyToClipboardButton: React.FunctionComponent<CopyToClipboardProps> = ({
  copyValue,
}) => {
  return (
    <CopyToClipboard
      text={copyValue}
      onCopy={() => message.success(`"${copyValue}" copied to clipboard`)}
    >
      <Button shape="circle" icon={<CopyOutlined />} size="small" />
    </CopyToClipboard>
  );
};

export default CopyToClipboardButton;
