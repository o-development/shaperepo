import { Db, Collection } from 'mongodb';
import TermRecord from '../types/TermRecord';
import SchemaRecord from '../types/SchemaRecord';
import SchemaMetadata from '../types/SchemaMetadata';
import traverseSchema from '../util/traverse/traverseSchema';
import { shapes } from '../types/shexTypes';

const RDF_VALUE = 'http://www.w3.org/2000/01/rdf-schema#';
const SERIALIZED_RDF_VALUE: string = RDF_VALUE.replace(/\./g, '%2E');

export default class DbApi {
  private shapeCollection: Collection<SchemaRecord>;
  private termCollection: Collection<TermRecord>;

  constructor(db: Db) {
    this.shapeCollection = db.collection('shapes');
    this.termCollection = db.collection('terms');
  }

  async getTerm(id: string): Promise<TermRecord | null> {
    const returnedTerm = (
      await this.termCollection
        .aggregate([
          {
            $match: {
              _id: id,
            },
          },
          {
            $lookup: {
              from: 'shapes',
              localField: 'incomingPredicateReferences',
              foreignField: '_id',
              as: 'incomingPredicateReferences',
            },
          },
          {
            $lookup: {
              from: 'shapes',
              localField: 'incomingObjectReferences',
              foreignField: '_id',
              as: 'incomingObjectReferences',
            },
          },
        ])
        .toArray()
    )[0];
    return {
      ...returnedTerm,
      incomingObjectReferences: ((returnedTerm.incomingObjectReferences as unknown) as SchemaRecord[]).map(
        (ref: SchemaRecord) => ({
          _id: ref.metadata.id,
          label: ref.metadata.label,
        }),
      ),
      incomingPredicateReferences: ((returnedTerm.incomingPredicateReferences as unknown) as SchemaRecord[]).map(
        (ref: SchemaRecord) => ({
          _id: ref.metadata.id,
          label: ref.metadata.label,
        }),
      ),
    };
  }

  async getSchema(id: string): Promise<SchemaRecord | null> {
    const returnedSchema = (
      await this.shapeCollection
        .aggregate([
          {
            $match: {
              _id: id,
            },
          },
          {
            $lookup: {
              from: 'terms',
              localField: 'metadata.outgoingPredicateReferences',
              foreignField: '_id',
              as: 'metadata.outgoingPredicateReferences',
            },
          },
          {
            $lookup: {
              from: 'terms',
              localField: 'metadata.outgoingObjectReferences',
              foreignField: '_id',
              as: 'metadata.outgoingObjectReferences',
            },
          },
        ])
        .toArray()
    )[0];
    const newSchema: SchemaRecord = {
      ...returnedSchema,
      ...(await traverseSchema(returnedSchema, {
        schema: async (schema) => {
          schema[RDF_VALUE] = schema[SERIALIZED_RDF_VALUE];
          delete schema[RDF_VALUE];
          return schema;
        },
        shapes: async (shapesObj) => {
          const newShapes: shapes = {};
          Object.keys(shapesObj).forEach((key) => {
            newShapes[key.replace(/%2E/g, '.')] = shapesObj[key];
          });
          return newShapes;
        },
      })),
    };
    return newSchema;
  }

  async getRawSchema(id: string): Promise<SchemaRecord | null> {
    return await this.shapeCollection.findOne({ _id: id });
  }

  async searchSchema(text: string): Promise<SchemaMetadata[]> {
    const results = await this.shapeCollection
      .find({ $text: { $search: text } })
      .toArray();
    return results.map((result) => result.metadata);
  }

  async allSchemas(): Promise<SchemaMetadata[]> {
    const results = await this.shapeCollection.find({}).limit(24).toArray();
    return results.map((result) => result.metadata);
  }
}
