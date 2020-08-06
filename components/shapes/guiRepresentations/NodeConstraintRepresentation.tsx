import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { NodeConstraint } from '../../../types/shexTypes';
import ValueSetValueRepresentation from './ValueSetValueRepresentation';
import { Tag } from 'antd';

// This is a helpful resource http://books.xmlschemata.org/relaxng/relax-CHP-19.html
const dataTypes: Record<string, string> = {
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML': 'HTML',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString': 'Language String',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral': 'Plain Literal',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral': 'XML Literal',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#JSON': 'JSON',
  'http://www.w3.org/2001/XMLSchema#anyURI': 'URI',
  'http://www.w3.org/2001/XMLSchema#base64Binary': 'Base64 Coded Binary',
  'http://www.w3.org/2001/XMLSchema#boolean': 'Boolean',
  'http://www.w3.org/2001/XMLSchema#byte': 'Byte',
  'http://www.w3.org/2001/XMLSchema#date': 'Date',
  'http://www.w3.org/2001/XMLSchema#dateTime': 'Date-Time',
  'http://www.w3.org/2001/XMLSchema#decimal': 'Decimal',
  'http://www.w3.org/2001/XMLSchema#double': 'Double',
  'http://www.w3.org/2001/XMLSchema#duration': 'Duration',
  'http://www.w3.org/2001/XMLSchema#ENTITIES':
    'Entity Reference List (Whitespace Separated)',
  'http://www.w3.org/2001/XMLSchema#ENTITY': 'Entity Reference',
  'http://www.w3.org/2001/XMLSchema#float': 'Float',
  'http://www.w3.org/2001/XMLSchema#gDay': 'Recurring Monthly Day',
  'http://www.w3.org/2001/XMLSchema#gMonth': 'Recurring Yearly Month',
  'http://www.w3.org/2001/XMLSchema#gMonthDay': 'Recurring Yearly Day',
  'http://www.w3.org/2001/XMLSchema#gYear': 'One-year Period',
  'http://www.w3.org/2001/XMLSchema#gYearMonth': 'One-month Period',
  'http://www.w3.org/2001/XMLSchema#hexBinary': 'Hex Binary',
  'http://www.w3.org/2001/XMLSchema#ID': 'ID',
  'http://www.w3.org/2001/XMLSchema#IDREF': 'ID Reference',
  'http://www.w3.org/2001/XMLSchema#IDREFS': 'ID Reference List',
  'http://www.w3.org/2001/XMLSchema#int': '32-bit Int',
  'http://www.w3.org/2001/XMLSchema#integer': 'Integer',
  'http://www.w3.org/2001/XMLSchema#language': 'Language Code',
  'http://www.w3.org/2001/XMLSchema#long': 'Long',
  'http://www.w3.org/2001/XMLSchema#Name': 'Name',
  'http://www.w3.org/2001/XMLSchema#NCName': 'Unqualified Names',
  'http://www.w3.org/2001/XMLSchema#negativeInteger': 'Negative Integer',
  'http://www.w3.org/2001/XMLSchema#NMTOKEN': 'Name Token',
  'http://www.w3.org/2001/XMLSchema#NMTOKENS': 'Name Token List',
  'http://www.w3.org/2001/XMLSchema#nonNegativeInteger': 'Non-Negative Integer',
  'http://www.w3.org/2001/XMLSchema#nonPositiveInteger': 'Non-Positive Integer',
  'http://www.w3.org/2001/XMLSchema#normalizedString':
    'Whitespace-replaced String',
  'http://www.w3.org/2001/XMLSchema#NOTATION': 'Notation',
  'http://www.w3.org/2001/XMLSchema#positiveInteger': 'Positive Integer',
  'http://www.w3.org/2001/XMLSchema#QName': 'Qualified Name',
  'http://www.w3.org/2001/XMLSchema#short': 'Short',
  'http://www.w3.org/2001/XMLSchema#string': 'String',
  'http://www.w3.org/2001/XMLSchema#time': 'Time',
  'http://www.w3.org/2001/XMLSchema#token': 'Token',
  'http://www.w3.org/2001/XMLSchema#unsignedByte': 'Unsigned Byte',
  'http://www.w3.org/2001/XMLSchema#unsignedInt': 'Unsigned Int',
  'http://www.w3.org/2001/XMLSchema#unsignedLong': 'Unsigned Long',
  'http://www.w3.org/2001/XMLSchema#unsignedShort': 'Unsigned Short',
};

const NodeConstraintRepresentation: RepresenationComponent<NodeConstraint> = ({
  data,
}) => {
  if (data.values) {
    const valueComponents = data.values.map((value, i) => (
      <ValueSetValueRepresentation data={value} key={i} />
    ));
    return <span>{valueComponents}</span>;
  }
  if (data.datatype) {
    const dataTypeName = dataTypes[data.datatype] || data.datatype;
    return <Tag>{dataTypeName}</Tag>;
  }
  if (data.nodeKind) {
    return <Tag>{data.nodeKind}</Tag>;
  }
  return null;
};

export default NodeConstraintRepresentation;
