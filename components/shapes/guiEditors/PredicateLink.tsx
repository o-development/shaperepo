import React, { useContext, CSSProperties } from 'react';
import CustomLink from '../../common/CustomLink';
import { GetLabelContext } from '../GuiShapeRepresentation';
import { Space } from 'antd';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';
import EditorComponent from './EditorComponent';

interface AdditionalPredicateLinkProps {
  style?: CSSProperties;
}

const PredicateLink: EditorComponent<string, AdditionalPredicateLinkProps> = ({
  data,
  style,
}) => {
  const predicate = data;
  const getLabel = useContext(GetLabelContext);
  const label = getLabel(predicate);
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
};

export default PredicateLink;
