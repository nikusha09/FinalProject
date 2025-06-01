export type ParsingErrorType =
  | 'MissingTitle'
  | 'MissingIngredient'
  | 'MissingStep'
  | 'InvalidLineFormat'
  | 'InvalidQuantity'
  | 'UnknownPrefix';

export interface ParsingError {
  lineNumber: number;
  message: string;
  type: ParsingErrorType;
}