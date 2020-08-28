import React, { useState } from 'react';
import { createContext } from 'react';
import SchemaRecord from '../../types/SchemaRecord';
import SchemaEditor from './guiEditors/SchemaEditor';
import { Switch } from 'antd';

interface GuiShapeRepresentationProps {
  schema: SchemaRecord;
}

export type getLabelFunction = (url: string) => string | undefined;

export const GetLabelContext = createContext<getLabelFunction>(() => '');

const GuiShapeRepresentation: React.FunctionComponent<GuiShapeRepresentationProps> = ({
  schema,
}) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div style={{ padding: '25px 50px 25px 50px' }}>
      <GetLabelContext.Provider
        value={(url: string) => {
          const { metadata } = schema;
          const foundReference = metadata.incomingReferences
            .concat(metadata.outgoingObjectReferences)
            .concat(metadata.outgoingPredicateReferences)
            .find((ref) => {
              if (typeof ref === 'string') {
                return false;
              }
              return ref._id === url;
            });
          if (foundReference && typeof foundReference !== 'string') {
            return foundReference.label;
          }
        }}
      >
        <Switch onChange={(val) => setEditMode(val)} checked={editMode} />
        <SchemaEditor
          data={schema}
          schemaUrl={schema.metadata.id}
          editMode={editMode}
        />
      </GetLabelContext.Provider>
    </div>
  );
};

export default GuiShapeRepresentation;
