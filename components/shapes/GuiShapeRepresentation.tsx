import React from 'react';
import { createContext } from 'react';
import SchemaRecord from '../../types/SchemaRecord';
import SchemaRepresentation from './guiRepresentations/SchemaRepresentation';

interface GuiShapeRepresentationProps {
  schema: SchemaRecord;
}

export type getLabelFunction = (url: string) => string | undefined;

export const GetLabelContext = createContext<getLabelFunction>(() => '');

const GuiShapeRepresentation: React.FunctionComponent<GuiShapeRepresentationProps> = ({
  schema,
}) => {
  return (
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
      <SchemaRepresentation data={schema} />
    </GetLabelContext.Provider>
  );
};

export default GuiShapeRepresentation;
