import React, { useContext, CSSProperties } from 'react';
import CustomLink from '../../common/CustomLink';
import { GetLabelContext } from '../GuiShapeRepresentation';
import { Space, Select, Input } from 'antd';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';
import EditorComponent from './EditorComponent';
import { Option } from 'antd/lib/mentions';

interface AdditionalPredicateLinkProps {
  style?: CSSProperties;
}

const PredicateEditor: EditorComponent<
  string,
  AdditionalPredicateLinkProps
> = ({ data, style, editMode }) => {
  const predicate = data;
  const getLabel = useContext(GetLabelContext);
  const label = getLabel(predicate);
  if (!editMode) {
    const renderedLink = label ? (
      <CustomLink href={`/terms?id=${encodeURIComponent(predicate)}`}>
        {label}
      </CustomLink>
    ) : (
      <CustomLink href={predicate} target="_blank">
        {predicate}
      </CustomLink>
    );
    return (
      <Space style={style}>
        <CopyToClipboardButton copyValue={predicate} />
        {renderedLink}
      </Space>
    );
  }
  return <Input addonBefore={label} value={data} />;
};

export default PredicateEditor;
